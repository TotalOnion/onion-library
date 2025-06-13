<?php

add_action('wp_ajax_nopriv_get_pattern_block', 'get_pattern_block');

// Lets gooooo!
function get_pattern_block()
{
	if (! $_POST['postID']) {
		echo 'No post ID sent';
		die();
	}

	return_pattern_block($_POST['postID']);
}

// Returns the whole nicely cleaned block back to the ajax call
function return_pattern_block($pid)
{
	$post = get_post($pid);

	if (! $post) {
		echo 'No post';
		die();
	}

	$block = '';

	if (has_blocks($post->post_content)) {
		$parse_block = parse_blocks($post->post_content)[0];
		$block = pattern_clean($parse_block);
	}

	echo json_encode($block);

	die();
}

// Initial function to call all cleaner functions
function pattern_clean($parsed_block)
{
	$name = str_replace('acf/', '', $parsed_block['blockName']);
	$block = render_block($parsed_block);

	// Remove blank lines
	$block = preg_replace(
		"/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/",
		"\n",
		$block
	);
	$block = dom_prettify_html($block);

	// Remove loaded
	$block = str_replace(
		'loaded',
		'',
		$block
	);

	// Replace block id
	$block = preg_replace(
		"/\bblock_[a-zA-Z0-9]*/",
		'{{block.id}}',
		$block
	);

	// Add block class to first section
	$block = dom_set_block_class($block);

	// Create repeated code - !!! MUST HAPPEN FIRST !!!
	$block = dom_repeaters($block);

	// Replace srcsets
	$block = replace_image_sources($block);

	// Replace video vars
	$block = replace_video_sources($block);

	// Replace fields
	$block = replace_fields($block, "fields", $name);

	// Fix elements that break when run through DOM. Fix self ending tags
	$block = dom_clean_html($block);
	$block = fix_close_tags($block);

	return array(
		'name' => $name,
		'html' => $block
	);
}

// Loops through and replaces all fields with new Twig vars
function replace_fields($block, $type = "fields", $name = "")
{
	// Links
	$block = replace_fields_link($block, $type);

	preg_match_all(
		'/%%(.*?)%%/',
		$block,
		$matches,
		PREG_PATTERN_ORDER
	);

	foreach ($matches[1] as $match) {
		// Post meta
		$block = replace_fields_post_meta($block, $match, $type);

		// Generic fields
		$block = replace_fields_generic($block, $match, $type);
	}

	// Post info
	$block = dom_replace_node_value($block, $type, $name);

	return $block;
}

// Replace the post meta fields
function replace_fields_post_meta($block, $match, $type)
{
	if (str_contains($match, '|')) {
		$split = explode('|', $match);
		$block = str_replace(
			'%%' . $match . '%%',
			'{{ get_post( ' . $type . '.' . $split[0] . ' ).' . $split[1] . ' }}',
			$block
		);
	}

	return $block;
}

// Replace the link fields
function replace_fields_link($block, $type = 'fields')
{
	$dom = new DOMDocument;
	$dom->loadHTML($block, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

	$xpath = new DOMXpath($dom);
	$ctas = $xpath->query('//*[@data-pattern-cta-selection]');

	if ($ctas->length > 0) {
		foreach ($ctas as $cta) {
			$pattern_replaced = $cta->getAttribute('data-pattern-replaced');
			if ($pattern_replaced) {
				return $block;
			} else {
				$cta->setAttribute('data-pattern-replaced', 1);
			}

			$fragStart = $dom->createDocumentFragment();
			$fragStart->appendXML("{% if ( " . $type . ".link" . " or " . $type . ".cta ) %}");
			$cta->parentNode->insertBefore($fragStart, $cta);

			$anchors = $xpath->query('a', $cta);

			$tmp_dom = new DOMDocument();
			$tmp_dom->appendChild($tmp_dom->importNode($anchors[0], true));
			$anchor = trim($tmp_dom->saveHTML());

			preg_match_all(
				'/%%(.*?)%%/',
				$anchor,
				$matches
			);

			foreach ($matches[1] as $match) {
				if (str_contains($match, '~')) {
					$split = explode('~', $match);

					$find = array("http://", "https://", "%%" . $match . "%%");
					$replace = array("", "", "{{ " . $type . "." . $split[0] . "['" . $split[1] . "'] }}");
					$anchor = str_replace($find, $replace, $anchor);

					$anchor = preg_replace(
						"/\btarget=\"[a-zA-Z0-9_]*\"/",
						"target=\"{{ " . $type . "." . $split[0] . "['target'] }}\"",
						$anchor
					);
				}
			}

			$newNode = $dom->createDocumentFragment();
			$newNode->appendXML($anchor);
			$cta->nodeValue = '';
			$cta->appendChild($newNode);

			$fragEnd = $dom->createDocumentFragment();
			$fragEnd->appendXML("{% endif %}");
			$cta->parentNode->appendChild($fragEnd);
		}
	}

	$block = $dom->saveHTML();

	return $block;
}

// Replace generic fields e.g. text/number
function replace_fields_generic($block, $match, $type)
{
	$block = str_replace(
		'%%' . $match . '%%',
		'{{ ' . $type . '.' . $match . ' }}',
		$block
	);

	return $block;
}

// Replaces all the image srcs with correct Twig ones
function replace_image_sources($block, $type = 'fields')
{
	$dom = new DOMDocument;
	$dom->loadHTML($block, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

	$picture_tags = $dom->getElementsByTagName('picture');

	if (!empty($picture_tags)) {
		foreach ($picture_tags as $picture_tag) {
			if ($picture_tag->getAttribute('data-pattern-dynamic') == '1') {

				$pattern_replaced = $picture_tag->getAttribute('data-pattern-replaced');
				if ($pattern_replaced) {
					return $block;
				} else {
					$picture_tag->setAttribute('data-pattern-replaced', 1);
				}

				$suffix = $picture_tag->getAttribute('data-pattern-suffix') ? '_' . $picture_tag->getAttribute('data-pattern-suffix') : '';
				$sources = $picture_tag->getElementsByTagName('source');

				$frag = $dom->createDocumentFragment();
				$frag->appendXML("{% set imageDesktop = get_image(" . $type . ".image_desktop" . $suffix . ") %}
				{% set imageTablet = get_image(" . $type . ".image_tablet" . $suffix . "|default(" . $type . ".image_desktop" . $suffix . ")) %}
				{% set imageMobile = get_image(" . $type . ".image_mobile" . $suffix . "|default(" . $type . ".image_desktop" . $suffix . ")) %}
				{% set isSVG = imageDesktop.post_mime_type == 'image/svg+xml' %}
				{% set mainImageSrc = isSVG ? imageDesktop.src : gt_image_mainsrc(imageDesktop) %}
				{% set desktopSrcset = isSVG ? imageDesktop.src : gt_image_srcset(imageDesktop) %}
				{% set tabletSrcset = isSVG ? imageTablet.src : gt_image_srcset(imageTablet)%}
				{% set mobileSrcset = isSVG ? imageMobile.src : gt_image_srcset(imageMobile)%}");

				$parent = $sources->item(0);
				$parent->parentNode->insertBefore($frag, $parent);

				if (!empty($sources)) {
					foreach ($sources as $source) {
						$attr = $source->getAttribute('data-type');

						if ($attr == 'srcSetDesktop') {
							$source->setAttribute('srcset', '{{desktopSrcset}}');
							$source->setAttribute('width', '{{imageDesktop.width}}');
							$source->setAttribute('height', '{{imageDesktop.height}}');
						}

						if ($attr == 'srcSetTablet') {
							$source->setAttribute('srcset', '{{tabletSrcset|default(desktopSrcset)}}');
							$source->setAttribute('width', '{{imagePortrait.width}}');
							$source->setAttribute('height', '{{imagePortrait.height}}');
						}

						if ($attr == 'srcSetMobile') {
							$source->setAttribute('srcset', '{{mobileSrcset|default(desktopSrcset)}}');
							$source->setAttribute('width', '{{imageMobile.width}}');
							$source->setAttribute('height', '{{imageMobile.height}}');
						}
					}
				}
			} else {
				$sources = $picture_tag->getElementsByTagName('source');

				if (!empty($sources)) {
					foreach ($sources as $source) {
						$sourceOriginal = $source->getAttribute('srcset');

						preg_match_all(
							'/(.*?)(?=\/wp-content|$)/',
							$sourceOriginal,
							$matches,
							PREG_PATTERN_ORDER
						);

						foreach ($matches[1] as $match) {
							$sourceOriginal = str_replace($match, '', $sourceOriginal);
						}

						$source->setAttribute('srcset', $sourceOriginal);
					}
				}
			}
		}
	}

	$image_tags = $dom->getElementsByTagName('img');

	if (!empty($image_tags)) {
		foreach ($image_tags as $image_tag) {
			$pattern_replaced = $image_tag->getAttribute('data-pattern-replaced');
			if ($pattern_replaced) {
				return $block;
			} else {
				$image_tag->setAttribute('data-pattern-replaced', 1);
			}

			$name = $image_tag->getAttribute('data-elementname');
			$render_dynamic = $image_tag->getAttribute('data-pattern-dynamic');

			if ($render_dynamic && $name === 'content-image') {
				$suffix =  $image_tag->getAttribute('data-pattern-suffix') ? '_' . $image_tag->getAttribute('data-pattern-suffix') : '';
				$frag = $dom->createDocumentFragment();
				$frag->appendXML("{% set content_image = get_image(" . $type . ".content_image" . $suffix . ") %}");
				$image_tag->parentNode->insertBefore($frag, $image_tag);
				$image_tag->setAttribute('src', '{{content_image.src}}');
				$image_tag->setAttribute('srcset', '{{content_image.srcset}}');
				$image_tag->setAttribute('alt', '{{content_image.alt}}');
				$image_tag->setAttribute('width', '{{content_image.width}}');
				$image_tag->setAttribute('height', '{{content_image.height}}');
			} elseif ($render_dynamic && $name === 'main-image') {
				$image_tag->setAttribute('src', '{{mainImageSrc}}');
				$image_tag->setAttribute('alt', '{{imageDesktop.alt}}');
			}

			if (! $render_dynamic) {
				$sourceOriginal = $image_tag->getAttribute('src');
				$sourceReplace = preg_match('/(.*?)(?=\/wp-content|$)/', $sourceOriginal, $matches);
				$image_tag->setAttribute('src', str_replace($matches[0], '', $sourceOriginal));
			}
		}
	}

	$block = $dom->saveHTML();

	return $block;
}

// Replaces all the video srcs with correct Twig ones
function replace_video_sources($block, $type = 'fields')
{
	$dom = new DOMDocument;
	$dom->loadHTML($block, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

	$xpath = new DOMXpath($dom);
	$videoIds = $xpath->query('//*[@data-videoid]');

	if ($videoIds->length > 0) {
		foreach ($videoIds as $videoId) {
			$pattern_replaced = $videoId->getAttribute('data-pattern-replaced');
			if ($pattern_replaced) {
				return $block;
			} else {
				$videoId->setAttribute('data-pattern-replaced', 1);
			}

			$render_dynamic = $videoId->getAttribute('data-pattern-dynamic');

			if ($render_dynamic == '1') {
				$suffix = $videoId->getAttribute('data-pattern-suffix') ? "_" . $videoId->getAttribute('data-pattern-suffix') : '';
				$video_type = $videoId->getAttribute('data-videotype');

				$frag = $dom->createDocumentFragment();
				$frag->appendXML("{% set videoType = " . $type . ".video_type" . $suffix . "|remove_underscore %}
				{% set youtubeEmbed = " . $type . ".youtube_embed" . $suffix . "|default(false) %}
				{% set vimeoEmbed = " . $type . ".vimeo_embed" . $suffix . "|default(false) %}
				{% set videoDesktop = " . $type . ".video_desktop" . $suffix . "|default(false) %}
				{% set videoMobile = " . $type . ".video_mobile" . $suffix . "|default(false) %}
				{% set vimeoMobile = " . $type . ".vimeo_mobile" . $suffix . " %}");

				$videoId->parentNode->insertBefore($frag, $videoId);

				$videoId->setAttribute("data-desktopvideo", "{{videoDesktop['url']}}");
				$videoId->setAttribute("data-mobilevideo", "{{videoMobile['url']}}");
				$videoId->setAttribute("data-youtubemobile", "{{youtubeMobile|default(false)}}");
				$videoId->setAttribute("data-vimeomobile", "{{vimeoMobile|default(false)}}");

				// Add video type check
				$frag_after = $dom->createDocumentFragment();
				$frag_after->appendXML("{% if videoType == 'upload' %}
					<video class=\"{{block.className|default('cblvc')}}__video-player cblvc-video-container__video-player\" playsinline=\"true\" width=\"{{videoDesktop.width}}\" height=\"{{videoDesktop.height}}\">
					</video>
				{% endif %}
				{% if videoType == 'youtube' %}
					{{ youtubeEmbed }}
				{% endif %}
				{% if videoType == 'vimeo' %}
					{{ vimeoEmbed }}
				{% endif %}");

				$videoTag = $xpath->query('//*[@data-pattern-type]', $videoId);
				$parent = $videoTag->item(0);
				$parent->nodeValue = '';
				$parent->appendChild($frag_after);

				$videoId->getElementsByTagName('video')[0]->setAttribute('muted', '{{ muted ? true : false}}');
			} else {
				$desktopVideoOriginal = $videoId->getAttribute('data-desktopvideo');
				$mobileVideoOriginal = $videoId->getAttribute('data-mobilevideo');

				$desktopVideoReplace = preg_match('/(.*?)(?=\/wp-content|$)/', $desktopVideoOriginal, $matches);
				$mobileVideoReplace = preg_match('/(.*?)(?=\/wp-content|$)/', $mobileVideoOriginal, $matches);

				$videoId->setAttribute('data-desktopvideo', str_replace($matches[0], '', $desktopVideoOriginal));
				$videoId->setAttribute('data-mobilevideo', str_replace($matches[0], '', $mobileVideoOriginal));
			}
		}
	}

	$block = $dom->saveHTML();

	return $block;
}

function dom_repeaters($html)
{
	$dom = dom_load($html);
	$xpath = new DOMXpath($dom);
	$nodes = $xpath->query('//*[@data-pattern-repeater-child]');

	if ($nodes->length === 0) {
		return $html;
	}

	$chunk_html = '';
	foreach ($nodes as $node) {
		$tmp_dom = new DOMDocument();
		$tmp_dom->appendChild($tmp_dom->importNode($node, true));

		$repeated = trim($tmp_dom->saveHTML());

		$repeated = replace_image_sources($repeated, 'item');
		$repeated = replace_video_sources($repeated, 'item');
		$repeated = replace_fields($repeated, "item");
		$repeated = fix_close_tags($repeated);
		$repeated = dom_clean_html($repeated);

		$chunk_html .= $repeated;
	}

	$parent = $xpath->query('//*[@data-pattern-repeater-parent]')[0];
	$parent->nodeValue = ''; // clear

	$loop_start = $dom->createDocumentFragment();
	$loop_start->appendXML("{% if fields.items %}\n{% for item in fields.items %}");
	$parent->appendChild($loop_start);

	$chunk = $dom->createDocumentFragment();
	$chunk->appendXML('<![CDATA[' . $chunk_html . ']]>');
	$parent->appendChild($chunk);

	$loop_end = $dom->createDocumentFragment();
	$loop_end->appendXML("{% endfor %}\n{% endif %}");
	$parent->appendChild($loop_end);

	$html = $dom->saveHTML();

	return $html;
}

// Fix self ending tags
function fix_close_tags($block)
{
	$voidTags = array('area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr');
	$regEx = '#<\b(' . implode('|', $voidTags) . ')([^>]+)><\/\b\1>#';
	$block = preg_replace(
		$regEx,
		'<\\1\\2 />',
		$block
	);

	$regEx = '#<\b(img)([^>]+)>#';
	return preg_replace(
		$regEx,
		'<\\1\\2 />',
		$block
	);
}

/* -------------------------------
    DOM FUNCTIONS
------------------------------- */

// Prettifies the code before we start anything
function dom_prettify_html($html)
{
	$dom = dom_load($html);
	$html = $dom->saveHTML();
	return $html;
}

function dom_set_block_class($html)
{
	$dom = dom_load($html);
	$xpath = new DOMXpath($dom);

	$firstSection = $xpath->query('//section[1]')[0];

	$firstSection->setAttribute('class', $firstSection->getAttribute('class') . ' {{ block.className }}');

	$html = $dom->saveHTML();

	return $html;
}

// Uses the classes in Post Info items and loops through to replace contents with Twig variables
function dom_replace_node_value($html, $type = "fields", $name = "")
{
	$dom = dom_load($html);
	$root = $dom->documentElement;

	$xpath = new DOMXpath($dom);
	$nodes = $xpath->query('//*[@data-pattern-post-info]');

	if ($nodes->length === 0) {
		return $html;
	}

	$postInfo = 'postInfoItem';
	$postInfoType = 'item.post';

	if ($type == 'fields') {
		if ($name === 'current-post-info') {
			$postInfoType = 'current_post';
			$getPostGlobal = $dom->createDocumentFragment();
			$getPostGlobal->appendXML("<inserttwig>{% set " . $postInfo . " = get_post( " . $postInfoType . " ) %}</inserttwig>");
			$firstSection = $xpath->query('//section[1]')[0];
			$firstSection->parentNode->insertBefore($getPostGlobal, $firstSection);
		} else {
			$postInfoType = 'fields.post';
		}
	}

	if ($type == 'item') {
		$getPostGlobal = $dom->createDocumentFragment();
		$getPostGlobal->appendXML("<inserttwig>{% set " . $postInfo . " = get_post( " . $postInfoType . " ) %}</inserttwig>");

		$firstSection = $xpath->query('//section[1]')[0];
		$firstSection->parentNode->insertBefore($getPostGlobal, $firstSection);
	}

	// Handle post cover links similar to CTA logic
	$postLinkNodes = $xpath->query('//*[@data-pattern-post-info="link"]');

	foreach ($postLinkNodes as $linkNode) {
		$patternReplaced = $linkNode->getAttribute('data-pattern-replaced');
		if ($patternReplaced) {
			continue;
		}

		$linkNode->setAttribute('data-pattern-replaced', 1);
		$linkNode->setAttribute('href', '{{ ' . $postInfo . '.link }}');
		$linkNode->setAttribute('aria-label', '{{ ' . $postInfo . '.title }}');
	}


	foreach ($nodes as $node) {

		$elem = $node->getAttribute('data-pattern-post-info');

		if ($elem == 'link') {
			$node->setAttribute('href', '{{ ' . $postInfo . '.' . $elem . ' }}');
		} else if ($elem == 'post_image') {
			$frag = $dom->createDocumentFragment();
			$frag->appendXML("{% set image = get_image(" . $postInfo . "." . $elem . ") %}
			{% set isSVG = check_file_type(image.id) == 'image/svg+xml' %}
			{% set mainImageSrc = gt_image_mainsrc(image) %}
			{% set srcset = isSVG ? '' : gt_image_srcset(image) %}");

			$srcset = $xpath->query('//*[@srcset]', $node);
			$parent = $srcset->item(0);
			$parent->parentNode->insertBefore($frag, $parent);

			$parent->setAttribute("srcset", "{{ srcset }}");
			$parent->setAttribute("src", "{{ mainImageSrc }}");
			$parent->setAttribute("title", "{{ image.title }}");
			$parent->setAttribute("alt", "{{ image.alt }}");
		} else if ($elem == 'product_icon') {
			$frag = $dom->createDocumentFragment();
			$frag->appendXML("{% set image = get_image(" . $postInfo . "." . $elem . ") %}");

			$srcset = $xpath->query('//*[@srcset]', $node);
			$parent = $srcset->item(0);
			$parent->parentNode->insertBefore($frag, $parent);

			$parent->setAttribute("srcset", "{{ srcset }}");
			$parent->setAttribute("src", "{{ image.src }}");
			$parent->setAttribute("title", "{{ image.title }}");
			$parent->setAttribute("alt", "{{ image.alt }}");
		} else {
			$node->nodeValue = '{{ ' . $postInfo . '.' . $elem . ' }}';
		}
	}

	$html = $dom->saveHTML();

	return $html;
}

/* -------------------------------
    DOM HELPER FUNCTIONS
------------------------------- */

// Creates an initial DOM and loads it without wrappers
function dom_load($html)
{
	$dom = new DOMDocument();
	$dom->loadHTML($html);

	return $dom;
}

// Some DOMDocument weirdness - this fixes the Twig
function dom_clean_html($html)
{
	$dom = dom_load($html);

	$html = $dom->saveHTML();

	// Replace entities
	$html = str_replace(
		array('%20', '%7B', '%7D', '%5B', '%5D'),
		array(' ', '{', '}', '[', ']'),
		$html
	);

	// Had to keep these wrappers in, so removing here
	$html = str_replace(
		array('<body>', '</body>', '<head>', '</head>', '<html>', '</html>', '<inserttwig>', '</inserttwig>', 'http', '</source>'),
		array('', '', '', '', '', '', '', '', 'https', ''),
		$html
	);

	// Doctype be gone!
	$html = preg_replace(
		'/<!DOCTYPE\s+html[\s>](.*?)>/',
		'',
		$html
	);

	return $html;
}
