import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from './elements.styles';


interface accordionProps {
    expandedId: string,
    name: string,
    descriptions: string
}
const IAccordion = ({ expandedId, name, descriptions }: accordionProps) => {
    // const changeTheme = useChangeTheme();
    const [expanded, setExpanded] = React.useState<string | false>(expandedId);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    // if (auth.currentUser?.providerData[0]?.providerId !== 'password') return <Redirect to='/login' />
    return (
        <div>
            { }
            <Accordion square expanded={expanded === expandedId} onChange={handleChange(expandedId)}>
                <AccordionSummary aria-controls={expandedId} id={expandedId}>
                    <Typography>{name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {descriptions}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>#2 security details </Typography>
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
            </Accordion> */}
        </div>
    )
}

export default IAccordion;