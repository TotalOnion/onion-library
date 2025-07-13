import videocontroller from '@total_onion/onion-videocontroller/onion-videocontroller.js';

export default function videocontentv3Js ( options = {} ) {
	try {
		const { block } = options;
		const videoController = new videocontroller(block);
	} catch ( error ) {
		console.error( error );
	}
}