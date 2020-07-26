import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { Button, PanelBody, IconButton, TextControl, SelectControl } from '@wordpress/components';


const Faq = () => {
	registerBlockType('aimhigher/faq', {
		title: 'FAQs',
		icon: 'format-chat',
		category: 'common',
		attributes: {
			faqs: {
				type: 'array',
				source: 'query',
				default: [],
				selector: '.faqs details',
				query: {
					question: {
						type: 'string',
						selector: 'summary',
						source: 'text'
					},
					answer: {
						type: 'string',
						selector: '.answer',
						source: 'html',
						multiline: 'p'
					}
				}
			}
		},
		edit(props) {
			let faqFields

			const addFaq = () => {
				const faqs = [...props.attributes.faqs]
				

				faqs.push({
					question: '',
					answer: '',
				})

				props.setAttributes({faqs})
			},
			removeFaq = (index) => {
				const faqs = [...props.attributes.faqs]

				faqs.splice(index, 1)
				
				props.setAttributes({faqs})
			},
			questionChange = (question, index) => {
				const faqs = [...props.attributes.faqs]

				faqs[index].question = question

				props.setAttributes({faqs})
			},
			answerChange = (answer, index) => {
				const faqs = [...props.attributes.faqs]

				faqs[index].answer = answer

				props.setAttributes({faqs})
			}

			if(props.attributes.faqs.length) {
				faqFields = props.attributes.faqs.map((faq, index) => {
					return (
						<div className="faq" key={index}>
							<label>Question:</label>
							<TextControl
								className="question"
								value={props.attributes.faqs[index].question}
								onChange={(question) => {questionChange(question, index)}}
							/>
							<label>Answer:</label>
							<RichText
								className="answer"
								tagName="div"
								multiline="p"
								value={props.attributes.faqs[index].answer}
								onChange={(answer) => {answerChange(answer, index)}}
							/>
							<IconButton
								className="remove"
								icon="no-alt"
								label="Delete FAQ"
								onClick={() => {removeFaq(index)}}
							/>
						</div>
					)
				})
			}
			
			return (
				<div className="faqs" id="block-editable-box">
					{faqFields}
					<Button className="add" isDefault onClick={addFaq.bind(this)}>
						Add FAQ
					</Button>
				</div>
			);
		},
	
		save(props) {
			return (
				<ul className="faqs">
					{props.attributes.faqs.map((faq, index) => {
						return (
							<li key={index}>
								<details>
									<summary>{faq.question}</summary>
									<RichText.Content tagName="div" className="answer" value={faq.answer}/>
								</details>
							</li>
						)
					})}
				</ul>
			);

		},
	});
}

export default Faq