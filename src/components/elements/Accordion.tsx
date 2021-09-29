import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from './elements.styles';


type AccordionShapeProps = {
    expandedId: string,
    name: string,
    descriptions: string
}
interface AccordionProps {
    options: AccordionShapeProps[]
}
const IAccordion = (props: AccordionProps) => {
    const { options } = props;
    const [expanded, setExpanded] = React.useState<string | false>();
    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };
    console.log(options);

    // if (auth.currentUser?.providerData[0]?.providerId !== 'password') return <Redirect to='/login' />
    return (
        <div>
            {options.map((item) => (
                <Accordion square expanded={expanded === item.expandedId} onChange={handleChange(item.expandedId)}>
                    <AccordionSummary aria-controls={item.expandedId} id={item.expandedId}>
                        <Typography>{item.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {item.descriptions}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export default IAccordion;