import { NavLink } from "react-router-dom";
import { Button, Container, Icon, Item } from "semantic-ui-react";

function HomePage(){
    return(
        <Container>
            <Item.Group>
                <Item>
                    <Item.Image>
                        <Icon name='building' size='huge' />
                    </Item.Image>
                    <Item.Content>
                        <Item.Header as='a' style={{fontSize:24}}>Account opening</Item.Header>
                        <Item.Meta>
                            <Icon name='thumbs up outline' size='big' /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Item.Meta>
                        <Item.Extra>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio modi assumenda
                            nesciunt nam provident nulla eos dignissimos natus sequi, asperiores beatae odio!</p>
                                <br/>
                            <Button content='Apply' color='grey' as={NavLink} to='/accountopening' />
                        </Item.Extra> 
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Image>
                        <Icon name='compose' size='huge' />
                    </Item.Image>
                    <Item.Content>
                        <Item.Header as='a' style={{fontSize:24}}>Account amendment</Item.Header>
                        <Item.Meta>
                            <Icon name='shield' size='big' /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Item.Meta>
                        <Item.Extra>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio modi assumenda
                                nesciunt nam provident nulla eos dignissimos natus sequi, asperiores beatae odio!</p>
                            <br/>
                            <Button content='Apply' color='grey' />
                        </Item.Extra> 
                    </Item.Content>
                </Item>
                <Item>
                    <Item.Image>
                        <Icon name='money bill alternate outline' size='huge' />
                    </Item.Image>
                    <Item.Content>
                        <Item.Header as='a' style={{fontSize:24}}>Online loan application</Item.Header>
                        <Item.Meta>
                            <Icon name='clock outline' size='big' /> Get a salary loan in 24 hours
                        </Item.Meta>
                        
                        <Item.Extra>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio modi assumenda
                            nesciunt nam provident nulla eos dignissimos natus sequi, asperiores beatae odio!</p>
                            <br/>
                            <Button content='Apply' color='grey' />
                        </Item.Extra> 
                    </Item.Content>
                </Item>
            </Item.Group>
        </Container>
    )
}

export default HomePage