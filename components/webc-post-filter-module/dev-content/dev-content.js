import ramsesImage from './ramses-tired.jpeg';
import kaiImage from './kai.jpeg';
import mrBusinessImage from './mr-business-doing-work.jpeg';
import amberImage from './amber.jpg';
import blueyImage from './bluey.jpg';
import ramsesKittenImage from './ramses-kitten.jpeg';
import luluMadImage from './lulu-mad.jpg';
import peteBath from './pete-bath.jpeg';
import skyLivingLarge from './sky-field.jpeg';
import fatGigioSleepy from './fat-gigio-sleepy.png';
import fatGigioKitten from './fat-gigio-kitten.png';
import peteDinosaur from './pete-dinosaur.jpeg';
import peteWork from './pete-at-work.jpeg';
import vanillePartyDress from './vanille-party-dress.jpeg';
import vanillePuppyFace from './vanille-puppy-face.jpeg';

export const devContentPets = [
	{
		name: 'Tired Ramses',
		link: '#',
		images: {
			post_image_src: ramsesImage
		},
		categories: [13, 3, 10]
	},
	{
		name: 'Kai',
		link: '#',
		images: {
			post_image_src: kaiImage
		},

		categories: [12, 2, 10]
	},
	{
		name: 'Mr Business',
		link: '#',
		images: {
			post_image_src: mrBusinessImage
		},

		categories: [13, 3, 9]
	},
	{
		name: 'Amber',
		link: '#',
		images: {
			post_image_src: amberImage
		},

		categories: [13, 4, 10]
	},
	{
		name: 'Bluey',
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
		name: 'Pete the Dinosaur',
		link: '#',
		images: {
			post_image_src: peteDinosaur
		},

		categories: [13, 10, 4]
	},
	{
		name: 'Fat Gigio Sleepy',
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
		name: 'Pete at Work',
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

		categories: [14, 10, 5]
	},
	{
		name: 'Fat Gigio Kitten',
		link: '#',
		images: {
			post_image_src: fatGigioKitten
		},

		categories: [12, 10, 5]
	}
];

export const devContentCategories = [
	{name: 'Mood', id: '6', parentid: '0'},
	{name: 'Angry', id: '1', parentid: '6'},
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
