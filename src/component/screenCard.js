import React from 'react';
import { Image, Button } from 'semantic-ui-react';
import '../App.css';

class ScreenCard extends React.Component {
    render() {
        return (
            <div className="screenCard">
                <Image src='/img/product_main_image.png' size='small' />
                <p className="screenTitleLabel">Canva_24"</p>
                <p className="screenDescription">Lorem ipsum dolor sit amet, consectetur adipiscinit uielaidl ... </p>
                <p className="screenDescription">150 left</p>
                <div className="screenButtonSection">
                    <Button className="screenMoreButton" onClick={this.props.openModal}>More</Button>
                    <Button primary className="screenBuyButton">1 Ξ Buy</Button>
                </div>
            </div>
        )
    }
}

export default ScreenCard;