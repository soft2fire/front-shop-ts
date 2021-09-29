import React from 'react';
// import { useChangeTheme } from '../reducer/ThemeReducer';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from './Home.styles';
// import IAccordion from '../components/elements/Accordion';

const Home = () => {
    const theme = useTheme();
    // const changeTheme = useChangeTheme();
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    // if (auth.currentUser?.providerData[0]?.providerId !== 'password') return <Redirect to='/login' />
    return (
        <div>
            {/* {[{ descriptions: "test1", expandedId: "panel1", name: "feature1" },
            { descriptions: "test2", expandedId: "panel2", name: "feature2" },
            { descriptions: "test3", expandedId: "panel3", name: "feature3" }
            ].map((item) => <IAccordion descriptions={item.descriptions} expandedId={item.expandedId} name={item.name} />)} */}
            {/* <IAccordion descriptions="test" expandedId="panel1" name="feature" />
            <IAccordion descriptions="test2" expandedId="panel2" name="feature2" /> */}

            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>#1 selected technology</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        please turn on your vpn,:(
                        Make with react and typescript template<p />
                        styled with material ui v4 and custom way for capsulate elements and components style
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>#2 protected route & authenticate</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        authenticate with google token and firebase database<p />
                        route protected with live token and rejected all unregistered users and some future on this section
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>#3 simple shop</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        all product come as fakeStoreApi <p />
                        products and product functions like add to cart and total price provided in project<p />
                        users cart and users stage saved in firebase storage,some where local storage <p />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Home;