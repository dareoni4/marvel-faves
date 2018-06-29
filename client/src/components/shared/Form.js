import { Component } from 'react';

/**
 * Form HOC.
 */
class Form extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);
        this.state = {
            inputs: props.inputs
        };
    }

    /**
     * Handle input changes.
     */
    handleChange = event => {
        const { name, value, checked, type } = event.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: type === 'checkbox' ? checked : value
                }
            };
        });
    };

    /**
     * Handle form submission.
     */
    handleSubmit = event => {
        event.preventDefault();
        this.props.submit(this.state.inputs);
        if (this.props.reset) {
            this.setState({ inputs: this.props.inputs });
        }
    };

    /**
     * Render component, passed as prop.
     *
     * @return {Component}
     */
    render() {
        return this.props.render({
            handleSubmit: this.handleSubmit,
            handleChange: this.handleChange,
            inputs: this.state.inputs,
            error: this.props.error
        });
    }
}

export default Form;
