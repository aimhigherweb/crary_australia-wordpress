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
					name: 'Blue',
					slug: 'blue',
					color: '#007cbb',
				},
				{
					name: 'Aqua',
					slug: 'aqua',
					color: '#00acbb',
				},
				{
					name: 'Grey',
					slug: 'grey',
					color: '#4c4d4e'
				},
			];

			let colour = props.attributes.colour,
			styles = {}
			
			if(colour) {
				styles = {'--background': colour }
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
								onChange={ (e) => {
									props.setAttributes({colour: e})
								} }
							/>
						</InspectorControls>
					}
					<InnerBlocks/>
				</div>
			);
		},
	
	save(props) {
		let colour = props.attributes.colour,
			styles = {}
			
			if(colour) {
				styles = {'--background': colour }
			}
		
		return (
			<div className="colour-container" style={styles}>
				<InnerBlocks.Content/>
			</div>
		);

		},
	});
}

export default colourContainer
