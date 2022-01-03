
export interface IFormProps {
    onSubmit : (data: any)=>void;
    buttonProps?: IButtonProps;
    onRenderSubmitButton?: IRenderFunction<IButtonProps>;
};

export interface IRenderFunction<T> {
    (props?: T, defaultRenderer?: IRenderFunction<T>) : JSX.Element | null;
}

export interface IButtonProps {
   buttonText?: string;
}