import * as React from 'react';
import { DialogProps } from '@material-ui/core/Dialog';
import { ButtonProps } from '@material-ui/core/Button';

export interface ConfirmOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode | null;
  confirmationText?: React.ReactNode;
  confirmationLoading?: boolean;
  closeAfterConfirm?: boolean;
  cancellationText?: React.ReactNode;
  dialogProps?: Omit<DialogProps, "open">;
  confirmationButtonProps?: ButtonProps;
  cancellationButtonProps?: ButtonProps;
}

export interface ConfirmProviderProps {
  defaultOptions?: ConfirmOptions;
}

export const ConfirmProvider: React.ComponentType<ConfirmProviderProps>;

export const useConfirm: () => (options?: ConfirmOptions) => Promise<void>;
