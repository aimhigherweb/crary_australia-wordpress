import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { ColorPalette } from '@wordpress/components';

const colourContainer = () => {
	registerBlockType('aimhigher/colour-container', {
		title: 'Coloured Container',
		icon: 'align-center',
		category: 'layout',
		attributes: {
			colour: {
				type: 'string',
				default: false
			},
		},
		edit(props) {
			const colours = [
				{
					name: 'Yellow',
					slug: 'yellow',
					color: '#ffd600',
				},
				{
					name: 'Light Yellow',
					slug: 'light_yellow',
					color: '#ffeb80'
				},
				{
					name: 'Black',
					slug: 'black',
					color: '#191919',
				},
				{
					name: 'Light Grey',
					slug: 'light_grey',
					color: '#e6e6e6'
				},
			];

			let colour = props.attributes.colour,
				styles = {}

			if (colour) {
				styles = { '--background': colour }
			}

			return (
				<div className="colour-container" style={styles}>
					{
						<InspectorControls>
							<h2>Colour settings</h2>
							<ColorPalette
								colors={colours}
								value={colour}
								disableCustomColors='true'
								onChange={(e) => {
									props.setAttributes({ colour: e })
								}}
							/>
						</InspectorControls>
					}
					<InnerBlocks />
				</div>
			);
		},

		save(props) {
			let colour = props.attributes.colour,
				styles = {}

			if (colour) {
				styles = { '--background': colour }
			}

			return (
				<div className="colour-container" style={styles}>
					<InnerBlocks.Content />
				</div>
			);

		},
	});
}

export default colourContainer
