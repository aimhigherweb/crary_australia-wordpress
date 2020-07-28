import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload, RichText } from '@wordpress/block-editor';
import { Button, TextControl, SelectControl } from '@wordpress/components';


const Banner = () => {
	registerBlockType('aimhigher/banner', {
		title: 'Banner',
		icon: 'align-center',
		category: 'common',
		attributes: {
			bannerHeading: {
				type: 'string',
				selector: '.banner blockquote .head',
				source: 'text'
			},
			bannerText: {
				type: 'string',
				selector: '.banner blockquote .text',
				source: 'html'
			},
			cta: {
				type: 'array',
				default: [],
				source: 'query',
				selector: '.banner .ctas li',
				query: {
					text: {
						type: 'string',
						selector: 'a',
						source: 'text'
					},
					url: {
						type: 'string',
						selector: 'a',
						source: 'attribute',
						attribute: 'href'
					},
					colour: {
						type: 'string',
						selector: 'a',
						source: 'attribute',
						attribute: 'data-colour',
						default: '#ffd600'
					},
				}
			},
			image: {
				type: 'string',
				selector: '.banner',
				source: 'attribute',
				attribute: 'data-image'
			},
		},
		edit(props) {
			let banner = props.attributes.image,
				styles = {},
				ctaFields

			const addCta = () => {
				const ctas = [...props.attributes.cta]

				ctas.push({
					text: '',
					colour: '#ffd600',
					url: '',
				})

				props.setAttributes({ cta: ctas })
			},
				removeCta = (index) => {
					const ctas = [...props.attributes.cta]

					ctas.splice(index, 1)

					props.setAttributes({ ctas })
				},
				textChange = (text, index) => {
					const ctas = [...props.attributes.cta]

					ctas[index].text = text

					props.setAttributes({ ctas })
				},
				urlChange = (url, index) => {
					const ctas = [...props.attributes.cta]

					ctas[index].url = url

					props.setAttributes({ ctas })
				},
				colourChange = (colour, index) => {
					const ctas = [...props.attributes.cta]

					ctas[index].colour = colour

					props.setAttributes({ ctas })
				}

			if (banner) {
				styles = { '--bannerImage': `url(${banner})` }
			}

			if (props.attributes.cta.length) {
				ctaFields = props.attributes.cta.map((cta, index) => {
					return (
						<li className="cta" key={index}>
							<label>CTA Text</label>
							<TextControl
								value={props.attributes.cta[index].text}
								onChange={(text) => { textChange(text, index) }}
							/>
							<label>CTA URL</label>
							<TextControl
								value={props.attributes.cta[index].url}
								onChange={(url) => { urlChange(url, index) }}
							/>
							<label>CTA Colour</label>
							<SelectControl
								value={props.attributes.cta[index].colour}
								onChange={(colour) => { colourChange(colour, index) }}
								options={[
									{ value: '#ffd600', label: 'Primary' },
									{ value: '#000000', label: 'Secondary' },
								]}
							/>
							<Button
								className="remove"
								onClick={() => { removeCta(index) }}
							>
								Delete CTA Button
							</Button>
						</li>
					)
				})
			}

			return (
				<div className="banner" id="block-editable-box" style={styles}>
					<label>Banner Heading</label>
					<TextControl
						value={props.attributes.bannerHeading}
						onChange={(text) => { props.setAttributes({ bannerHeading: text }) }}
					/>
					<label>Banner Quote</label>
					<RichText
						tagName="div"
						onChange={(text) => { props.setAttributes({ bannerText: text }) }}
						value={props.attributes.bannerText}
						multiline="p"
					/>
					<label>Image</label>
					<MediaUpload
						onSelect={(newBanner) => { props.setAttributes({ image: newBanner.url }) }}
						allowedTypes="image"
						value={banner == undefined ? 'Select Image' : banner}
						render={({ open }) => (
							<Button onClick={open}>
								{banner == undefined ? 'Upload Image' : <img src={banner} />}
							</Button>
						)}
					/>
					<ul>
						{ctaFields}
					</ul>
					<Button className="add" isDefault onClick={addCta.bind(this)}>
						Add CTA Button
					</Button>
				</div>
			);
		},

		save(props) {
			let banner = props.attributes.image,
				styles = {}

			if (banner) {
				styles = { '--bannerImage': `url(${banner})` }
			}

			return (
				<div className="banner" style={styles} data-image={banner}>
					<blockquote>
						<p className="head">{props.attributes.bannerHeading}</p>
						<RichText.Content tagName="div" className="text" value={props.attributes.bannerText} />
					</blockquote>
					{props.attributes.cta &&
						<ul className="ctas">
							{props.attributes.cta.map(cta => (
								<li>
									<a href={cta.url} className="btn cta" style={`--cta_colour: ${cta.colour}`} data-colour={cta.colour}>{cta.text}</a>
								</li>
							))}
						</ul>
					}
				</div>
			);

		},
	});
}

export default Banner