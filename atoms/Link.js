import PropTypes from 'prop-types';

const Link = ({linkText, linkUrl, linkType}) => {
    return (
        <a className={`button ${linkType === "primary" ? 'button--primary' : 'button--secondary'}`} href={linkUrl}>{linkText}</a>
    )
}

export default Link;

Link.propTypes = {
    linkText: PropTypes.String,
    linkUrl: PropTypes.String,
    linkType: PropTypes.String
}

