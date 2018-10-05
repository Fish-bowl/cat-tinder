import React, { Component, Fragment } from 'react';
import { Header, Image, Card, Button, Icon } from 'semantic-ui-react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends Component {
  state = { cats: [] }

  componentDidMount() {
    axios.get('/api/cats')
      .then(res => this.setState({ cats: res.data }))
  }

  sample = () => {
    const { cats } = this.state
    if (cats.length) {
      const index = Math.floor(Math.random() * cats.length)
      return cats[index]
    } else {
      return null
    }
  }

  downVote = (id) => {
    const { cats } = this.state
    this.setState({ cats: cats.filter(c => c.id !== id) })
  }

  upVote = (id) => {
    const { cats } = this.state
    axios.put(`/api/cats/${id}`)
      .then(() => this.setState({ cats: cats.filter(c => c.id !== id) }))
  }

  render() {
    const cat = this.sample()
    if (cat) {
      return (
        <Fragment>
          <Card>
            <Image src={cat.avatar} />
            <Card.Content>
              <Card.Header>{cat.name}</Card.Header>
              <Card.Description>{cat.breed}</Card.Description>
              <Card.Meta>{cat.registry}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button basic onClick={() => this.downVote(cat.id)}>
                <Icon name="thumbs down" />
              </Button>
              <Button basic onClick={() => this.upVote(cat.id)}>
                <Icon name="thumbs up" />
              </Button>
            </Card.Content>
          </Card>
          <Link to="/my_cats">My Cats</Link>
        </Fragment>
      )
    } else {
      return (
        <Header as='h1' textAlign='center'>No More Cats</Header>
      );
    }
  }
}

export default Home;