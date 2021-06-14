import React from 'react';
import { Image, Button } from 'semantic-ui-react';
import '../App.css';

class ScreenCard extends React.Component {
    render() {
        return (
            <div className="screenCard">
                <Image src='/static/images/product_main_image.png' size='small' />
                <p className="screenTitleLabel">{this.props.frame.title}</p>
                <p className="screenDescription">{this.props.frame.description}</p>
                <p className="screenDescription">{this.props.frame.balance} left</p>
                <div className="screenButtonSection">
                    <Button className="screenMoreButton" onClick={() => this.props.openModal(this.props.frame, false)}>More</Button>
                    <Button secondary className="screenBuyButton" onClick={ () => this.props.openSalesModal(this.props.frame) }>{this.props.frame.price} Ξ Buy</Button>
                </div>
            </div>
        )
    }
}

export default ScreenCard;