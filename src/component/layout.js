import React, { Component } from 'react';
import axios from 'axios';
import { Image, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Web3Modal from "web3modal";
import { getNetworkConnectors } from '../helpers/getNetworkData';
import { connectWallet } from '../actions/home';
import { networkSetup } from '../helpers/networkSetup';
import ScreenCard from '../component/screenCard';
import TableList from './tableList';
import ShowModal from './modal';
import '../App.css';

export class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
		}
	}

	async componentDidMount() {
		this.props.connectWallet(new Web3Modal(getNetworkConnectors()));
		
	}

	async componentDidUpdate() {
		networkSetup(process.env.REACT_APP_NETWORK_ID).catch(e => {
			console.error(e);
			// alert('Network-Error');
		});
		if (this.props.home.web3) {
			console.log(this.props.home.web3);
			this.props.home.web3.eth.getBalance(this.props.home.address).then(console.log);
		}
	}

	openModal = () => {
		this.setState({ modalOpen: true });
	}

	closeModal = () => {
		this.setState({ modalOpen: false });
	}

	render() {
		return (
			<div className="layoutBG">
				<ShowModal 
					modalOpen={this.state.modalOpen}
					modalClose={this.closeModal}
				/>
				<div className="logoSection">
					<Image src="/img/elektr0canvas.png" height="160px" width="450px" />
				</div>
				<div className="table_body_scrollable">
					<Form>
						<div className="productsArea">
							<ScreenCard
								openModal={this.openModal}
							/>
							<ScreenCard 
								openModal={this.openModal}
							/>
							<ScreenCard 
								openModal={this.openModal}
							/>
						</div>
					</Form>
					<div className="productsInclusiveInfoSection">
							<div className="productsInclusiveInfo">
								<p>Every canva is shipped inclusive:</p>
								<p>+ power cable</p>
								<p>+ mountaining system</p>
								<p>+ basic frame</p>
							</div>
					</div>
					<div className="appIconSection">
							<p>Apps soon available</p>
							<div>
								<Image src="/img/download_apple_store.png" />
								<Image src="/img/download_google_play.png" />
							</div>
					</div>
					<div className="content-container">
							<div>
								<p>Invoices</p>
								<Button basic color='blue'>Download</Button>
							</div>
							<TableList />
					</div>
				</div>
				<div className="footer">
					<a href="#">Imprint</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="#">Newsletter</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="#">Support</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		connectWallet: web3Modal => dispatch(connectWallet(web3Modal))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
