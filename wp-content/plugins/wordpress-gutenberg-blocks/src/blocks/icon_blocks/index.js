import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, RichText } from '@wordpress/block-editor';
import { Button, IconButton, TextControl } from '@wordpress/components';


const iconBlocks = () => {
	registerBlockType('aimhigher/icon-blocks', {
		title: 'Icon Blocks',
		icon: 'groups',
		category: 'common',
		attributes: {
			blocks: {
				type: 'array',
				default: [],
				source: 'query',
				selector: '.block',
				query: {
					heading: {
						type: 'string',
						selector: 'h3',
						source: 'text'
					},
					icon: {
						type: 'string',
						selector: 'img',
						source: 'attribute',
						attribute: 'src'
					},
					text: {
						type: 'string',
						selector: '.content',
						source: 'html',
						multiline: 'p'
					}
				}
			}
		},
		edit(props) {
			let blockFields

			const addBlock = () => {
				const blocks = [...props.attributes.blocks]


				blocks.push({
					heading: '',
					text: '',
					icon: undefined,
				})

				props.setAttributes({ blocks })
			},
				removeBlock = (index) => {
					const blocks = [...props.attributes.blocks]

					blocks.splice(index, 1)

					props.setAttributes({ blocks })
				},
				headingChange = (text, index) => {
					const blocks = [...props.attributes.blocks]

					blocks[index].heading = text

					props.setAttributes({ blocks })
				},
				contentChange = (text, index) => {
					const blocks = [...props.attributes.blocks]

					blocks[index].content = text

					props.setAttributes({ blocks })
				},
				iconChange = (image, index) => {
					const blocks = [...props.attributes.blocks]

					blocks[index].icon = image.url

					props.setAttributes({ blocks })
				}

			if (props.attributes.blocks.length) {
				blockFields = props.attributes.blocks.map((block, index) => {
					let icon = props.attributes.blocks[index].icon
					return (
						<div className="block" key={index}>
							<label>Heading:</label>
							<TextControl
								className="heading"
								value={props.attributes.blocks[index].heading}
								onChange={(text) => { headingChange(text, index) }}
							/>
							<label>Content:</label>
							<RichText
								tagName="div"
								className="content"
								onChange={(text) => { contentChange(text, index) }}
								value={props.attributes.blocks[index].content}
								multiline="p"
							/>
							<label>Icon</label>
							<MediaUpload
								onSelect={(newIcon) => { iconChange(newIcon, index) }}
								allowedTypes="image"
								value={icon == undefined ? 'Select Image' : icon}
								render={({ open }) => (
									<Button onClick={open}>
										{icon == undefined ? 'Upload Icon' : <img src={icon} />}
									</Button>
								)}
							/>
							<IconButton
								className="remove"
								icon="no-alt"
								label="Delete Block"
								onClick={() => { removeBlock(index) }}
							/>
						</div>
					)
				})
			}

			return (
				<div className="blocks" id="block-editable-box">
					{blockFields}
					<Button className="add" isDefault onClick={addBlock.bind(this)}>
						Add Block
					</Button>
				</div>
			);
		},

		save(props) {
			return (
				<div className="blocks">
					{props.attributes.blocks.map((block, index) => (
						<div key={index} className="block">
							<img src={block.icon} />
							<h3>{block.heading}</h3>
							<RichText.Content tagName="div" className="content" value={block.content} />
						</div>
					))}
				</div>
			);

		},
	});
}

export default iconBlocks