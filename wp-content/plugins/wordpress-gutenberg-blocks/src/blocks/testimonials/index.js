import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';


const Testimonials = () => {
	registerBlockType('aimhigher/testimonials', {
		title: 'Testimonials',
		icon: 'format-quote',
		category: 'common',
		attributes: {
			testimonials: {
				type: 'array',
				default: [],
				source: 'query',
				selector: 'blockquote',
				query: {
					name: {
						type: 'string',
						selector: 'cite .name',
						source: 'text'
					},
					company: {
						type: 'string',
						selector: 'cite .company',
						source: 'text'
					},
					quote: {
						type: 'string',
						selector: '.quote',
						source: 'html',
						multiline: 'p'
					}
				}
			}
		},
		edit(props) {
			let testimonialFields

			const addTestimonial = () => {
				const testimonials = [...props.attributes.testimonials]

				testimonials.push({
					name: '',
					company: '',
					image: undefined,
					quote: '',
				})

				props.setAttributes({ testimonials })
			},
				removeTestimonial = (index) => {
					const testimonials = [...props.attributes.testimonials]

					testimonials.splice(index, 1)

					props.setAttributes({ testimonials })
				},
				nameChange = (name, index) => {
					const testimonials = [...props.attributes.testimonials]

					testimonials[index].name = name

					props.setAttributes({ testimonials })
				},
				companyChange = (company, index) => {
					const testimonials = [...props.attributes.testimonials]

					testimonials[index].company = company

					props.setAttributes({ testimonials })
				},
				quoteChange = (quote, index) => {
					const testimonials = [...props.attributes.testimonials]

					testimonials[index].quote = quote

					props.setAttributes({ testimonials })
				}

			if (props.attributes.testimonials.length) {
				testimonialFields = props.attributes.testimonials.map((teamMember, index) => {
					let image = props.attributes.testimonials[index].image
					return (
						<div className="testimonial" key={index}>
							<label htmlFor="name">Name</label>
							<TextControl
								className="name"
								value={props.attributes.testimonials[index].name}
								onChange={(name) => { nameChange(name, index) }}
							/>
							<label htmlFor="comp">Company</label>
							<TextControl
								className="company"
								value={props.attributes.testimonials[index].company}
								onChange={(company) => { companyChange(company, index) }}
							/>
							<label htmlFor="quote">Quote</label>
							<RichText
								tagName="div"
								className="quote"
								onChange={(quote) => { quoteChange(quote, index) }}
								value={props.attributes.testimonials[index].quote}
								multiline="p"
							/>
							<Button
								className="remove"
								onClick={() => { removeTestimonial(index) }}
							>
								Delete Testimonial
							</Button>
						</div>
					)
				})
			}

			return (
				<div className="testimonials" id="block-editable-box">
					{testimonialFields}
					<Button className="add" isDefault onClick={addTestimonial.bind(this)}>
						Add Testimonial
					</Button>
				</div>
			);
		},

		save(props) {
			const testimonials = props.attributes.testimonials.length;

			let styles = { '--testimonials': testimonials.toString() }

			return (
				<div className="testimonials" style={styles}>
					{props.attributes.testimonials.map((t, index) => {
						return (
							<>
								<input type="radio" name="testimonials" id={t.name} checked={index == 0 ? true : false} />
								<label htmlFor={t.name}>{t.name}</label>
								<blockquote>
									<RichText.Content tagName="div" className="quote" value={t.quote} />
									<cite><span className="name">{t.name}</span> – <span className="company">{t.company}</span></cite>
								</blockquote>
							</>
						)
					})}
				</div>
			);

		},
	});
}

export default Testimonials