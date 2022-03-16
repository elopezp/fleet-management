import React from 'react'
import { Form, Col } from 'react-bootstrap'
import { injectIntl } from "react-intl"
import Select from 'react-select'


const renderError = (hasError, error, intl) => {
    if (hasError) {
        return (
            <Form.Control.Feedback type="invalid">{intl ? intl.formatMessage({ id: error }) : error}</Form.Control.Feedback>
        );
    }
};
export const RenderInput = injectIntl(({ intl, ...props }) => {
    const { input, label, placeholder, type, sm, md, lg, xl, meta: { touched, error } } = props;
    const hasError = touched && error
    const isCol = sm || md || lg || xl
    return (
        <Form.Group as={isCol && Col} sm={sm} md={md} lg={lg} xl={xl} controlId={input.name} >
            <Form.Label>{label}</Form.Label>
            <Form.Control isInvalid={hasError}
                {...input}
                type={type}
                placeholder={placeholder ? placeholder : label}
            >
            </Form.Control>
            {renderError(hasError, error, intl)}
        </Form.Group>

    );
});

export const RenderSelect = injectIntl(({ intl, ...props }) => {
    const { input, label, placeholder, options, sm, md, lg, xl, meta: { touched, error } } = props;
    const hasError = touched && error
    const isCol = sm || md || lg || xl
    return (
        <Form.Group as={isCol && Col} sm={sm} md={md} lg={lg} xl={xl} controlId={input.name} >
            <Form.Label>{label}</Form.Label>
            <Form.Control isInvalid={hasError} className="d-none">
            </Form.Control>
            <Select
                {...input}
                placeholder={placeholder ? placeholder : label}
                options={options}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                closeMenuOnSelect={true}
            />
            {renderError(hasError, error, intl)}
        </Form.Group>

    );
});
