import React, { Component } from 'react'

class WhosOnlineList extends Component {
    renderUser() {
        return (
            <ul>
                {this.props.users.map((user, index) => {
                    if(user.id === this.props.currentUser.id) {
                        return(
                            <WhosOnlineListItem key={index} presenceState="online">
                                {user.name}(You)
                            </WhosOnlineListItem>
                        )
                    }
                    return (
                        <WhosOnlineListItem key={index} presenceState={user.present.state}>
                            {user.name}
                        </WhosOnlineListItem>
                    )
                })}
            </ul>
        )
    }

    render() {
        if(this.props.users) {
            return this.renderUsers()
        }
        else{
            return <p>Loading...</p>
        }
    }
}

class WhosOnlineListItem extends Component {
    render() {
        const styles = {
            li: {
                display: 'flex',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 5,
                paddingTop: 2,
                paddingBottom: 2,
            },
            div: {
                borderRadius: '50%',
                widht: 11,
                height: 11,
                marginRight: 10,
            }
        }
        return (
            <li style={styles.li}>
                <div
                    style={{
                        ...styles.div,
                        backgroundColor:
                        this.props.presenceState === 'online' ? '#539eff' : '414756',
                    }} 
                />
            </li>
        )
    }
}

export default WhosOnlineList