import PropTypes from 'prop-types';

export const Filter = ({title, filter, onChangeFilter}) => {
    return     <label>
    {title}
    <input  type="text" value={filter} onChange={onChangeFilter}/>
    </label>
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
}