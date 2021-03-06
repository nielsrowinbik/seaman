import { get, isFunction, set } from 'lodash';
import React, { Component, HTMLProps } from 'react';
import slugify from 'slugify';
import styled from '../../util/styled-components';
import Field from './Field';
import FieldContainer from './FieldContainer';
import FieldLabel, { FieldLegend } from './FieldLabel';
import Help from './Help';
import ListInput from './ListInput';
import Prefix from './Prefix';
import Wrapper from './Wrapper';

export interface InputProps {
	appearance: 'default' | 'error' | 'inline' | 'warning';
	help?: string;
	isCompact?: boolean;
	label?: string;
	prefix?: any;
	suffix?: any;
}

export interface InputState {
	isFocus: boolean;
}

export default class Input extends Component<InputProps & HTMLProps<HTMLInputElement>, InputState> {
	readonly state: InputState = {
		isFocus: false
	};

	render () {
		const { children, help, label, prefix, ref, suffix, ...props } = this.props;
		const id = props.id || slugify(`field-${props.name || label || props.placeholder}`, { lower: true });
		const container = { appearance: props.appearance, disabled: props.disabled, ...this.state };
		const helpProps = { appearance: props.appearance };
		const wrapper = { isCompact: props.isCompact };

		switch (props.type) {
		case 'checkbox':
			const Label = styled.label`
				&[disabled]:not([disabled="false"]):hover {
					cursor: no-drop;

					* {
						pointer-events: none;
					}
				}
			`;
			return (
				<Wrapper {...wrapper}>
					{label && <FieldLegend required={props.required}>{label}</FieldLegend>}
					<Label disabled={props.disabled}>
						<input {...props} />
						<span>{props.placeholder}</span>
					</Label>
					{help && <Help {...helpProps}>{help}</Help>}
				</Wrapper>
			);
		case 'file':
			return <input {...props} />;
		case 'image':
			return null;
			// return (
			// 	<Wrapper {...wrapper}>
			// 		{label && <FieldLegend required={props.required}>{label}</FieldLegend>}
			// 		<Container>
			// 			<img src={props.value || props.defaultValue} />
			// 			<a>select image</a>
			// 			<input {...props} accept="image/*" type="file" value="" />
			// 		</Container>
			// 	</Wrapper>
			// );
		case 'radio':
			return <input {...props} />;
		case 'range':
			return <input {...props} />;
		case 'list':
			return <ListInput {...this.props} />;
		default:
			return (
				<Wrapper {...wrapper}>
					{label && <FieldLabel htmlFor={id} required={props.required}>{label}</FieldLabel>}
					<FieldContainer {...container}>
						<Prefix>{prefix}</Prefix>
						<Field
							{...props}
							id={id}
							onFocus={toggleState(this, 'isFocus', 'onFocus')}
							onBlur={toggleState(this, 'isFocus', 'onBlur')}
						/>
						{suffix}
					</FieldContainer>
					{children}
					{help && <Help {...helpProps}>{help}</Help>}
				</Wrapper>
			);
		}
	}
}

export const toggleState = (component, statePath: string, propName: string) => (event: React.SyntheticEvent<any>) => {
	component.setState(set({ ...component.state }, statePath, !get(component.state, statePath)));
	const prop = get(component, `props.${propName}`);
	if (isFunction(prop)) prop(event);
};
