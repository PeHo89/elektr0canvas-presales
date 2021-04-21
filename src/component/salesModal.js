import React, { Component } from 'react';
import { Image, Modal, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getFrames } from '../actions/frame';

export class SalesModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
      firstName: '',
      lastName: '',
      email: '',
			code: '',
			company: '',
			address1: '',
			address2: '',
			city: '',
			country: '',
			phone: '',
			zipCode: '',

			firstNameError: false,
      lastNameError: false,
      emailError: false,
			codeError: false,
			address1Error: false,
			cityError: false,
			countryError: false,
			zipCodeError: false,

			existCodeInput: false
    }
	}

	handleSubmit = () => {
		var emailError = false
		var firstNameError = false
		var lastNameError = false
		var codeError = false
		var address1Error = false
		var cityError = false
		var countryError = false
		var zipCodeError = false

    if (this.state.email === '') {
      this.setState({emailError: true});
			emailError = true;
    } else {
      this.setState({emailError: false});
			emailError = false;
    }
    if (this.state.firstName === '') {
      this.setState({firstNameError: true});
			firstNameError = true;
    } else {
      this.setState({firstNameError: false});
			firstNameError = false;
    }
    if (this.state.lastName === '') {
      this.setState({lastNameError: true});
			lastNameError = true;
    } else {
      this.setState({lastNameError: false});
			lastNameError = false;
    }
    if (this.state.code === '' && this.state.existCodeInput) {
      this.setState({codeError: true});
			codeError = true;
    } else {
      this.setState({codeError: false});
			codeError = false;
    }
		if (this.state.address1 === '') {
      this.setState({address1Error: true});
			address1Error = true;
    } else {
      this.setState({address1Error: false});
			address1Error = false;
    }
		if (this.state.city === '') {
      this.setState({cityError: true});
			cityError = true;
    } else {
      this.setState({cityError: false});
			cityError = false;
    }
		if (this.state.country === '') {
      this.setState({countryError: true});
			countryError = true;
    } else {
      this.setState({countryError: false});
			countryError = false;
    }
		if (this.state.zipCode === '') {
      this.setState({zipCodeError: true});
			zipCodeError = true;
    } else {
      this.setState({zipCodeError: false});
			zipCodeError = false;
    }

    if (
			emailError ||
			firstNameError ||
			lastNameError ||
			codeError ||
			address1Error ||
			cityError ||
			countryError ||
			zipCodeError
		) {
			alert("Please complete all required fields.");
      return;
    } else {
			if (this.state.existCodeInput) {
				this.verifyCode(this.state.email, this.state.code);
			} else {
				this.verifyEmail(this.state.email);
			}
    }
	}

	verifyCode = (email, code) => {
		axios.post(
			`${process.env.REACT_APP_API_URL}/verify_code`, 
			{
				email,
				code
			}
		)
		.then(res => {
			if (res.data.verified) {
				this.setState({
					existCodeInput: false
				});
				this.transferAndRegisterBuyer();
			} else {
				alert("The code is incorrect. Please input the correct one!");
			}
		})
		.catch(error => {
			console.log("error");
		});
	}

	verifyEmail = (email) => {
		axios.post(
			`${process.env.REACT_APP_API_URL}/verify_email`, 
			{
				email
			}
		)
		.then(res => {
			if (res.data.verified) {
				this.transferAndRegisterBuyer();
			} else {
				this.setState({
					existCodeInput: true
				});
				alert(`Input the verification code we sent to ${this.state.email}.`);
				return;
			}
		})
		.catch(error => {
			console.log("error");
		});
	}

	transferAndRegisterBuyer = () => {
		if (this.props.home.web3) {
			var web3 = this.props.home.web3;
			web3.eth.sendTransaction({
				from: this.props.home.address,
				to: process.env.REACT_APP_TO_ADDRESS,
				value: (this.props.frameData.price * Math.pow(10, 18)).toString()
			})
			.on('transactionHash', (hash) => {
				this.registerBuyer();
			})
			.on('receipt', function(receipt) {
				console.log(receipt);
			})
			.on('confirmation', function(confirmationNumber, receipt) { 
				// console.log(confirmationNumber);
			})
			.on('error', (error) => {
				if (error.code !== 4001) {
					alert(error.message);
				}
			});
		} else {
			alert("Please setup a wallet first!");
		}
	}

	registerBuyer = () => {
		axios.post(
			`${process.env.REACT_APP_API_URL}/register_buyer`, 
			{
				email: this.state.email,
				first_name: this.state.firstName,
				last_name: this.state.lastName,
				company: this.state.company,
				address1: this.state.address1,
				address2: this.state.address2,
				city: this.state.city,
				country: this.state.country,
				zip_code: this.state.zipCode,
				phone: this.state.phone,
				frame: this.props.frameData.id
			}
		)
		.then(res => {
			alert("Successfully Ordered!");
			this.props.modalClose();
			this.props.getFrames();
		})
		.catch(error => {
			alert("The order is failed!");
		});
	}

	render() {
		return (
			<Modal open={this.props.modalOpen} size="small">
				<Modal.Header>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<p>{this.props.frameData.title}</p>
						<p style={{cursor:'pointer'}} onClick={this.props.modalClose}>&#10005;</p>
					</div>
				</Modal.Header>
				<Modal.Content>
					<div style={{display: "flex"}}>
						<div style={{width: "50%"}}>
							<div className="modalCotentInfoLabel">
								<div style={{display: 'block', marginRight: '50px'}}>
									<p>Size</p>
									<p>Category</p>
									<p>Price</p>
								</div>
								<div style={{display: 'block'}}>
									<p>{this.props.frameData.size}" ({this.props.frameData.size_mm})</p>
									<p>{this.props.frameData.category}</p>
									<p>{this.props.frameData.price} BNB</p>
								</div>
							</div>
							<Image src="/img/detail_img.png" size='medium' />
						</div>
						<div style={{width: "50%"}}>
							<Form>
								<h4 className="ui dividing header">Contact Information</h4>
								<Form.Input
									fluid
									id='form-subcomponent-shorthand-input-email'
									label='Email'
									placeholder='Email'
									required={true}
									onChange={(e) => this.setState({email: e.target.value})}
									error={this.state.emailError}
								/>
								<Form.Group widths='equal' style={this.state.existCodeInput ? {} : {display: "none"}}>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-code'
										label='Verification code'
										placeholder='Verification code'
										required={true}
										onChange={(e) => this.setState({code: e.target.value})}
										error={this.state.codeError}
									/>
									<Button className="screenMoreButton" style={{visibility: "hidden"}}>Resend</Button>
								</Form.Group>
								<h4 className="ui dividing header">Shipping Information</h4>
								<Form.Group widths='equal'>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-first-name'
										label='First name'
										placeholder='First name'
										required={true}
										onChange={(e) => this.setState({firstName: e.target.value})}
										error={this.state.firstNameError}
									/>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-last-name'
										label='Last name'
										placeholder='Last name'
										required={true}
										onChange={(e) => this.setState({lastName: e.target.value})}
										error={this.state.lastNameError}
									/>
								</Form.Group>
								<Form.Input
									fluid
									id='form-subcomponent-shorthand-input-company'
									label='Company'
									placeholder='Company'
									onChange={(e) => this.setState({company: e.target.value})}
								/>
								<Form.Group widths='equal'>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-address1'
										label='Street number'
										placeholder='Street and house number'
										required={true}
										onChange={(e) => this.setState({address1: e.target.value})}
										error={this.state.address1Error}
									/>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-address2'
										label='Additional address'
										placeholder='Additional address'
										onChange={(e) => this.setState({address2: e.target.value})}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-city'
										label='City'
										placeholder='City'
										required={true}
										onChange={(e) => this.setState({city: e.target.value})}
										error={this.state.cityError}
									/>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-country'
										label='Country'
										placeholder='Country'
										required={true}
										onChange={(e) => this.setState({country: e.target.value})}
										error={this.state.countryError}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-zip-code'
										label='Zip code'
										placeholder='Zip code'
										required={true}
										onChange={(e) => this.setState({zipCode: e.target.value})}
										error={this.state.zipCodeError}
									/>
									<Form.Input
										fluid
										id='form-subcomponent-shorthand-input-phone'
										label='Phone'
										placeholder='Phone'
										onChange={(e) => this.setState({phone: e.target.value})}
									/>
								</Form.Group>
							</Form>
						</div>
					</div>
					<div className="salesModalButtonSection">
						<Button className="screenMoreButton" onClick={this.props.modalClose} style={{width: "20%"}}>Cancel</Button>
						<Button primary className="screenBuyButton" onClick={() => { this.handleSubmit() }} style={{width: "20%"}}>{this.props.frameData.price} Ξ Buy</Button>
					</div>
				</Modal.Content>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getFrames: () => dispatch(getFrames())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesModal);
