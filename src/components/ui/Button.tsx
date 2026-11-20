import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from 'react';
import type { ButtonProps } from '@/types';

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    const classes = `button button--${variant} button--${size} ${className}`;

    if (typeof props.href === 'string') {
      const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a
          {...anchorProps}
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
        />
      );
    }

    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        {...buttonProps}
        ref={ref as Ref<HTMLButtonElement>}
        type={buttonProps.type ?? 'button'}
        className={classes}
      />
    );
  }
);

Button.displayName = 'Button';
export default Button;
