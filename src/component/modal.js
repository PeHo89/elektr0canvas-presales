import React from 'react';
import { Image, Modal} from 'semantic-ui-react';

const showModal = (props) => {
    return (
        <Modal open={props.modalOpen} size="small">
            <Modal.Header>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Canva 24"</p>
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
                        <p>42"(457mm x 304mm)</p>
                        <p>balfkfdlafd</p>
                        <p>1 BNB</p>
                    </div>
                </div>
                < Image src="/img/detail_img.png" size='medium' style={{ marginLeft: '25%' }} />
            </Modal.Content>
        </Modal>
    );
}

export default showModal;