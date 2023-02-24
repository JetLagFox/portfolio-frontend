import { useState } from "react";

import PropTypes from 'prop-types';

const TagItem = ({tag, index, handleSelection}) => {

    const [tagSelected, setTagSelected] = useState(false)

    return <span key={index} className={`experience-tag ${tagSelected ? "tag--selected" : ""}`} onClick={() => {setTagSelected(!tagSelected);handleSelection(tag)}}>#{tag}</span>
}

export default TagItem;

TagItem.proptypes = {
    tag: PropTypes.string,
    index: PropTypes.number,
    handleSelection: PropTypes.func
}
