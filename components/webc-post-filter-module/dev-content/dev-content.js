import ramsesImage from './ramses-tired.webp';
import kaiImage from './kai.webp';
import kaiSelfie from './kai-selfie.webp';
import kaiLounging from './kai-lounging.webp';
import mrBusinessImage from './mr-business-doing-work.webp';
import amberImage from './amber.webp';
import blueyImage from './bluey.webp';
import ramsesKittenImage from './ramses-kitten.webp';
import luluMadImage from './lulu-mad.webp';
import luluSerious from './lulu-serious.webp';
import peteBath from './pete-bath.webp';
import peteLawn from './pete-lawn.webp';
import skyLivingLarge from './sky-field.webp';
import skySecurity from './sky-security.webp';
import skyLuxury from './sky-luxury-2.webp';
import fatGigioSleepy from './fat-gigio-sleepy.webp';
import fatGigioKitten from './fat-gigio-kitten.webp';
import peteDinosaur from './pete-dinosaur.webp';
import peteWork from './pete-at-work.webp';
import vanillePartyDress from './vanille-party.webp';
import vanillePuppyFace from './vanille-puppy.webp';

export const devContentPets = [
	{
		name: 'Ramses Big Yawn',
		link: '#',
		images: {
			post_image_src: ramsesImage
		},
		categories: [13, 3, 10]
	},
	{
		name: 'Kai sees a ghost',
		link: '#',
		images: {
			post_image_src: kaiImage
		},

		categories: [12, 2, 10]
	},
	{
		name: 'Mr Business doing Business',
		link: '#',
		images: {
			post_image_src: mrBusinessImage
		},

		categories: [13, 3, 9]
	},
	{
		name: 'Waking up Amber',
		link: '#',
		images: {
			post_image_src: amberImage
		},

		categories: [13, 5, 10]
	},
	{
		name: 'Bluey on the move',
		link: '#',
		images: {
			post_image_src: blueyImage
		},

		categories: [2, 13, 8]
	},
	{
		name: 'Kitten Ramses',
		link: '#',
		images: {
			post_image_src: ramsesKittenImage
		},

		categories: [12, 2, 10]
	},
	{
		name: 'Mad Face Lulu',
		link: '#',
		images: {
			post_image_src: luluMadImage
		},

		categories: [14, 10, 5]
	},
	{
		name: 'Pete having a Bath',
		link: '#',
		images: {
			post_image_src: peteBath
		},

		categories: [13, 10, 5]
	},
	{
		name: 'Sky living large',
		link: '#',
		images: {
			post_image_src: skyLivingLarge
		},

		categories: [13, 10, 4]
	},
	{
		name: 'Dinosaur Pete',
		link: '#',
		images: {
			post_image_src: peteDinosaur
		},

		categories: [13, 10, 4]
	},
	{
		name: 'Cutie Fat Gigio',
		link: '#',
		images: {
			post_image_src: fatGigioSleepy
		},

		categories: [13, 10, 5]
	},
	{
		name: 'Puppy eyes Vanille',
		link: '#',
		images: {
			post_image_src: vanillePuppyFace
		},

		categories: [14, 10, 5]
	},
	{
		name: 'Pete the Consultant',
		link: '#',
		images: {
			post_image_src: peteWork
		},

		categories: [12, 10, 4]
	},
	{
		name: 'Party Dress Vanille',
		link: '#',
		images: {
			post_image_src: vanillePartyDress
		},

		categories: [14, 10, 4]
	},
	{
		name: 'Fat Gigio Kitten',
		link: '#',
		images: {
			post_image_src: fatGigioKitten
		},

		categories: [12, 10, 5]
	},
	{
		name: 'Sky Security Corps',
		link: '#',
		images: {
			post_image_src: skySecurity
		},

		categories: [12, 10, 4]
	},
	{
		name: 'Sky Luxury',
		link: '#',
		images: {
			post_image_src: skyLuxury
		},

		categories: [12, 10, 4]
	},
	{
		name: 'Kai Selfie',
		link: '#',
		images: {
			post_image_src: kaiSelfie
		},

		categories: [12, 10, 5]
	},
	{
		name: 'Lulu gets serious',
		link: '#',
		images: {
			post_image_src: luluSerious
		},

		categories: [12, 10, 5]
	},
	{
		name: 'Pete rules her lawn',
		link: '#',
		images: {
			post_image_src: peteLawn
		},

		categories: [13, 10, 4]
	},
	{
		name: 'Kai takes it easy',
		link: '#',
		images: {
			post_image_src: kaiLounging
		},

		categories: [13, 10, 4]
	}
];

export const devContentCategories = [
	{name: 'Mood', id: '6', parentid: '0'},
	{name: 'Happy', id: '1', parentid: '6'},
	{name: 'Frightened', id: '2', parentid: '6'},
	{name: 'Sleepy', id: '3', parentid: '6'},
	{name: 'Active', id: '4', parentid: '6'},
	{name: 'Chilled', id: '5', parentid: '6'},
	{name: 'Limbs', id: '7', parentid: '0'},
	{name: 'Two', id: '8', parentid: '7'},
	{name: 'Three', id: '9', parentid: '7'},
	{name: 'Four', id: '10', parentid: '7'},
	{name: 'Age', id: '11', parentid: '0'},
	{name: 'Baby', id: '12', parentid: '11'},
	{name: 'Adult', id: '13', parentid: '11'},
	{name: 'Vintage', id: '14', parentid: '11'}
];
