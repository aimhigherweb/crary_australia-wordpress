import { registerBlockType } from '@wordpress/blocks';
import { MediaUpload } from '@wordpress/block-editor';
import { Button, IconButton, TextControl } from '@wordpress/components';


const teamProfile = () => {
	registerBlockType('aimhigher/team-profile', {
		title: 'Team Profiles',
		icon: 'groups',
		category: 'common',
		attributes: {
			teamMembers: {
				type: 'array',
				default: []
			}
		},
		edit(props) {
			let teamFields

			const addTeamMember = () => {
				const teamMembers = [...props.attributes.teamMembers]
				

				teamMembers.push({
					name: '',
					profile: undefined,
				})

				props.setAttributes({teamMembers})
			},
			removeTeamMember = (index) => {
				const teamMembers = [...props.attributes.teamMembers]

				teamMembers.splice(index, 1)
				
				props.setAttributes({teamMembers})
			},
			nameChange = (name, index) => {
				const teamMembers = [...props.attributes.teamMembers]

				teamMembers[index].name = name

				props.setAttributes({teamMembers})
			},
			profileChange = (profile, index) => {
				const teamMembers = [...props.attributes.teamMembers]

				if(profile.sizes) {
					teamMembers[index].profile = profile.sizes.thumbnail
				}
				else {
					teamMembers[index].profile = profile.url
				}

				props.setAttributes({teamMembers})
			}

			if(props.attributes.teamMembers.length) {
				teamFields = props.attributes.teamMembers.map((teamMember, index) => {
					let profile = props.attributes.teamMembers[index].profile
					return (
						<div className="profile" key={index}>
							<label>Name:</label>
							<TextControl
								className="name"
								value={props.attributes.teamMembers[index].name}
								onChange={(name) => {nameChange(name, index)}}
							/>
							<label>Profile Image</label>
							<MediaUpload
								onSelect={(newprofile) => {profileChange(newprofile, index)}}
								allowedTypes="image"
								value={ profile == undefined ? 'Select Image' : profile }
								render={ ( { open } ) => (
									<Button onClick={ open }>
										{ profile == undefined ? 'Upload Profile Image' : <img src={ profile } /> }
									</Button>
								) }
							/>
							<IconButton
								className="remove"
								icon="no-alt"
								label="Delete Team Member"
								onClick={() => {removeTeamMember(index)}}
							/>
						</div>
					)
				})
			}
			
			return (
				<div className="team" id="block-editable-box">
					{teamFields}
					<Button className="add" isDefault onClick={addTeamMember.bind(this)}>
						Add Team Member
					</Button>
				</div>
			);
		},
	
		save(props) {
			return (
				<div className="team">
					{props.attributes.teamMembers.map((teamMember, index) => (
							<figure key={index} className="profile">
								<img src={teamMember.profile} />
								<figcaption>{teamMember.name}</figcaption>
							</figure>
						))}
				</div>
			);

		},
	});
}

export default teamProfile