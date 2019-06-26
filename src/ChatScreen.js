import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'


class ChatScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: {}
        }
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:31e2c567-cec2-4bca-839e-ec071e9f9eb9',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://localhost:3001/authenticate',
            }),
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })
            })
            .catch(error => console.error('error', error))
    }

    render() {
       const styles = {
           container: {
               height: '100vh',
               display: 'flex',
               flexDirection: 'column',
           },
           chatContainer: {
               display: 'flex',
               flex: 1,
           },
           whosOnlineListContainer: {
               width: '300px',
               flex: 'none',
               padding: 20,
               backgroundColor: '#2c303b',
               color: 'white',
           },
           chatListContainer: {
               padding: 20,
               width: '85%',
               display: 'flex',
               flexDirection: 'column',
           },
       }

       return(
           <div style={styles.container}>
               <div style={styles.chatContainer}>
                   <aside style={styles.whosOnlineListContainer}>
                       <h2>Who's Online PlaceHolder</h2>
                   </aside>
                   <section style={styles.chatListContainer}>
                       <h2>Chat PlaceHolder</h2>
                    </section>
                </div>
            </div>
       )
    }
}

export default ChatScreen