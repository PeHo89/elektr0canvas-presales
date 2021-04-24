import React, { Component } from 'react';
import { Image, Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Web3Modal from "web3modal";
import { getNetworkConnectors } from '../helpers/getNetworkData';
import { connectWallet } from '../actions/home';
import { getFrames } from '../actions/frame';
import { networkSetup } from '../helpers/networkSetup';
import ScreenCard from '../component/screenCard';
import TableList from './tableList';
import ShowModal from './modal';
import SalesModal from './salesModal';
import '../App.css';

export class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			salesModalOpen: false,
			selectedFrame: {
				title: "",
				size: 0,
				category: "",
				price: 0,
				image: "",
			}
		}
	}

	async componentDidMount() {
		this.props.connectWallet(new Web3Modal(getNetworkConnectors()));
		this.props.getFrames();
	}

	async componentDidUpdate() {
		networkSetup(process.env.REACT_APP_NETWORK_ID).catch(e => {
			console.error(e);
		});
	}

	openModal = (frame) => {
		this.setState({
			modalOpen: true,
			selectedFrame: {
				...frame
			}
		});
	}

	closeModal = () => {
		this.setState({ modalOpen: false });
	}

	openSalesModal = (data) => {
		this.setState({ salesModalOpen: true });
		this.setState({
			selectedFrame: {
				...data
			}
		})
	}

	closeSalesModal = () => {
		this.setState({ salesModalOpen: false });
	}

	render() {
		return (
			<div className="layoutBG">
				<ShowModal 
					modalOpen={this.state.modalOpen}
					modalClose={this.closeModal}
					frameData={this.state.selectedFrame}
				/>
				<SalesModal 
					modalOpen={this.state.salesModalOpen}
					modalClose={this.closeSalesModal}
					frameData={this.state.selectedFrame}
				/>
				<div className="logoSection">
					<Image src="/static/images/elektr0canvas.png" height="160px" width="450px" />
				</div>
				<div className="table_body_scrollable">
					<Form>
						<div className="productsArea">
							{this.props.frame.frames.map( (item, i) => {
									return (
										<ScreenCard
											openModal={this.openModal}
											openSalesModal={this.openSalesModal}
											frame={item}
											key={item.id}
										/>
									);
								})
							}
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
								<Image src="/static/images/download_apple_store.png" />
								<Image src="/static/images/download_google_play.png" />
							</div>
					</div>
					{/* <div className="content-container">
							<div>
								<p>Invoices</p>
								<Button basic color='blue'>Download</Button>
							</div>
							<TableList />
					</div> */}
				</div>
				<div className="footer">
					<a href="#Imprint">Imprint</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="#Newsletter">Newsletter</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="#Support">Support</a>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home,
		frame: state.frame
	};
};

const mapDispatchToProps = dispatch => {
	return {
		connectWallet: web3Modal => dispatch(connectWallet(web3Modal)),
		getFrames: () => dispatch(getFrames())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
