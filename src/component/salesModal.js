import React from 'react';
import { Image, Modal, Button, Form } from 'semantic-ui-react';

const salesModal = (props) => {
	return (
		<Modal open={props.modalOpen} size="small">
			<Modal.Header>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<p>{props.frameData.title}</p>
					<p style={{cursor:'pointer'}} onClick={props.modalClose}>&#10005;</p>
				</div>
			</Modal.Header>
			<Modal.Content>
				<div className="modalCotentInfoLabel">
					<div style={{display: 'block', marginRight: '50px'}}>
						<p>Size</p>
						<p>Category</p>
						<p>Price</p>
					</div>
					<div style={{display: 'block'}}>
						<p>{props.frameData.size}</p>
						<p>{props.frameData.category}</p>
						<p>{props.frameData.price} BNB</p>
					</div>
				</div>
				< Image src={props.frameData.image} size='medium' style={{ marginLeft: '25%' }} />
				<h4 class="ui dividing header">Shipping Information</h4>
				<Form>
					<Form.Group widths='equal'>
						<Form.Input
							fluid
							id='form-subcomponent-shorthand-input-first-name'
							label='First name'
							placeholder='First name'
						/>
						<Form.Input
							fluid
							id='form-subcomponent-shorthand-input-last-name'
							label='Last name'
							placeholder='Last name'
						/>
					</Form.Group>
					<Form.Group widths='equal'>
						<Form.Input
							fluid
							id='form-subcomponent-shorthand-input-email'
							label='Email'
							placeholder='Email'
						/>
						<Form.Input
							fluid
							id='form-subcomponent-shorthand-input-address'
							label='Address'
							placeholder='Address'
						/>
					</Form.Group>
				</Form>
				<div className="salesModalButtonSection">
					<Button className="screenMoreButton" onClick={props.modalClose}>Cancel</Button>
					<Button primary className="screenBuyButton" onClick={() => { props.transferBNB(props.frameData.price) }}>{props.frameData.price} Ξ Buy</Button>
				</div>
			</Modal.Content>
		</Modal>
	);
}

export default salesModal;