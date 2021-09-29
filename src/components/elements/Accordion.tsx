import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from './elements.styles';


// interface accordionProps {
//     name:string,
// }
const Home = () => {
    // const changeTheme = useChangeTheme();
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    // if (auth.currentUser?.providerData[0]?.providerId !== 'password') return <Redirect to='/login' />
    return (
        <div>
            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>#1 app future</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography># 2security details </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem 
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>#3 used technology</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem 
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Home;