import React from 'react';
import { Message ,Container} from 'semantic-ui-react'
const Error = () => {
    return (
        <Container  style={{marginTop:"15%"}}>
        <Message negative>
    <Message.Header>We're sorry something went wrong  </Message.Header>
    <p>Try to reload the page</p>
  </Message>
  </Container>
    );
};

export default Error;