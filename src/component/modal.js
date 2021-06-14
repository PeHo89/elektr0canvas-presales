import React from 'react';
import { Image, Modal} from 'semantic-ui-react';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';

const showModal = (props) => {
    return (
        <Modal open={props.modalOpen} size="small">
            <Modal.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    { !props.isCongratulationModal && <p>{props.frameData.title}</p> }
                    { props.isCongratulationModal && <p className="thanks-text">Thanks for buying, here is what you bought</p> }
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
                        <p>{props.frameData.size}" ({props.frameData.size_mm})</p>
                        <p>{props.frameData.category}</p>
                        <p>{props.frameData.price} BNB</p>
                    </div>
                </div>
                { props.isCongratulationModal && <ConfettiExplosion 
                    duration = "3000"
                />}
                <Image src="/static/images/detail_img.png" size='medium' style={{ marginLeft: '25%' }} />
            </Modal.Content>
        </Modal>
    );
}

export default showModal;