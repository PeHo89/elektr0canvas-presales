import React, { Component } from 'react';
import axios from 'axios';
import { Image, Button, Form } from 'semantic-ui-react';
import ScreenCard from '../component/screenCard';
import TableList from './tableList';
import ShowModal from './modal';
import credentials from '../middleware/credentials';
import Instance from '../middleware/web3';
import '../App.css';

class Layout extends Component {
    state = {
        fileList: [],
        file: '',
        accountId: '',
        loading: false,
        fieldReq: false,
        readFileIframe: '',
        fileType: '',
        modalOpen: false,
        fileName: '',
    }
    async componentDidMount() {

        let acc = await Instance.web3.eth.getAccounts();
        this.setState({ accountId: acc[0] });
        this.observe();
        axios.defaults.headers.common['api_key'] = credentials.API_KEY;
        axios.defaults.headers.common['api_secret'] = credentials.API_SECRET;

        if (acc[0] === credentials.ADMIN) {
            this.getALLHashes();
        }
        else {
            this.getFileHash();
        }
    }

    getFileHash = async () => {
        let data = await Instance.Config.methods.getList().call({ from: this.state.accountId });
        let actual = [];
        if(data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
                actual.push({
                        Name :  data[i].fileName.split("/")[1],
                        Hash :  data[i].fileHash,
                        verfiledBoolean : 0
                    });
            }
        }
        this.setState({ fileList: actual });
    }

    getALLHashes = async () => {
        let response = await axios({
            method: 'post',
            url: credentials.CUSTOM_URL+"/moibit/listfiles",
            data: { path: "/" }
        });
        let data = [];
        if(response.data.data.Entries !== null) {
            for (let i = 0; i < response.data.data.Entries.length; i++) {
                if (response.data.data.Entries[i].Type === 0) {
                    await data.push({
                        Name :  response.data.data.Entries[i].Name,
                        Hash :  response.data.data.Entries[i].Hash,
                        verfiledBoolean : 0
                    });
                }
            }
        }
        this.setState({ fileList: data });
    }

    observe = async () => {
        try {
            setTimeout(this.observe, 1000);
            const accounts = await Instance.web3.eth.getAccounts();
            if (accounts[0] === this.state.accountId) {

            }
            else {
                window.location = "/";
            }
            return;
        }
        catch (error) {
            console.log(error.message);
        }
    }

    checkForProvenence = async (name,hash) => {
        let response = await axios({
            method: 'post',
            url: credentials.CUSTOM_URL+"/moibit/listfiles",
            data: { path: "/" }
        });

        let allFiles = response.data.data.Entries;
        const index1 = allFiles.map(e => e.Name).indexOf(name);
        let checkingHash = '';
        if(index1 != -1) {
            checkingHash = allFiles[index1].Hash;
        }
        

        let successs = true;
        let files = this.state.fileList;
        const index = files.map(e => e.Name).indexOf(name);
        if(files[index].verfiledBoolean === 0) {
            files[index] = {
                Name :  name,
                Hash :  hash,
                verfiledBoolean : 2
            }
            this.setState({fileList : files});

            /* we are rendering all the root files so we are adding / in prefix to file name */
            const filename = credentials.API_KEY+'/'+name; 
            if(checkingHash == await Instance.Config.methods.getHashByName(filename).call()) {
                files[index] = {
                    Name :  name,
                    Hash :  hash,
                    verfiledBoolean : 1
                }
                this.setState({fileList : files});
            }
            else {
                files[index] = {
                    Name :  name,
                    Hash :  hash,
                    verfiledBoolean : -1
                }
                this.setState({fileList : files});
                successs = false;
            }
            return successs;
        }
        else {
            return successs;
        }
    }

    readFile = async (filehash, fileName) => {
        if(await this.checkForProvenence(fileName,filehash)) {
            var responseType = '';
            if (fileName.substr(-3, 3) === "txt" || fileName.substr(-3, 3) === "csv" || fileName.substr(-3, 3) === "php" || fileName.substr(-3, 3) === "html" || fileName.substr(-2, 2) === "js") {
                responseType = '';
            }
            else {
                responseType = 'blob';
            }
            const url = credentials.CUSTOM_URL+'/moibit/readfilebyhash';
            axios({
                method: 'post',
                url: url,
                responseType: responseType,
                data: {
                    hash: filehash
                }
            })
            .then(response => {
                if (typeof (response.data) == "string") {
                    this.setState({ readFileIframe: response.data,
                        fileType: response.headers['content-type'],
                        fileName: fileName,
                        modalOpen: true
                    });
                }
                else {
                    this.setState({
                        readFileIframe: window.URL.createObjectURL(new Blob([response.data], {type:response.headers['content-type']})),
                        fileType: response.headers['content-type'],
                        fileName: fileName,
                        modalOpen: true 
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        else {
            this.setState({ readFileIframe: "The file got modified off-chain",
                            fileType: 'text/plain',
                            fileName: 'Alert!',
                            modalOpen: true
                        });
        }
    }

    openModal = () => {
        console.log("here");
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
                        <TableList 
                        />
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

export default Layout;