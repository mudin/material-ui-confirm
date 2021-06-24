import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import { storiesOf, addDecorator } from '@storybook/react';
import { ConfirmProvider, useConfirm } from '../src/index';

const confirmationAction = action('confirmed');

const Basic = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => confirm().then(confirmationAction)}>
      Click
    </Button>
  );
};

const WithDescription = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({ description: 'This action is permanent!' })
        .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomText = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        title: 'Reset setting?',
        description: 'This will reset your device to its factory settings.',
        confirmationText: 'Accept',
        cancellationText: 'Cancel',
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithDialogProps = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        dialogProps: { fullWidth: false, disableEscapeKeyDown: true },
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomButtonProps = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
        cancellationButtonProps: { variant: 'outlined' },
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomCallbacks = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm()
        .then(confirmationAction)
        .catch(action('cancelled'))
        .finally(action('closed'));
    }}>
      Click
    </Button>
  );
};

const WithCustomElements = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        title: (
          <Tooltip title="Fancy tooltip here!">
            <span>
              Reset setting?
            </span>
          </Tooltip>
        ),
        description: (
          <LinearProgress />
        ),
        confirmationText: 'Accept',
        cancellationText: 'Cancel',
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithCustomContent = () => {
  const confirm = useConfirm();
  return (
    <Button onClick={() => {
      confirm({
        content: (
          <div>
            <LinearProgress />
            <Box p={2}>This isn't wrapped in DialogContentText.</Box>
          </div>
        )
      })
      .then(confirmationAction);
    }}>
      Click
    </Button>
  );
};

const WithLoading = () => {
  const confirm = useConfirm();
  const [loading, setLoading] = useState(false);
  return (
    <Button onClick={() => {
      confirm({
        confirmationLoading: loading, // NEED FIX
        closeAfterConfirm: false,
        content: (
          <div>
            <LinearProgress />
            <Box p={2}>This isn't wrapped in DialogContentText.</Box>
          </div>
        )
      })
      .then((close)=>{
        // TODO: loading bar is not showing
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          close();
        }, 3000);
      });
    }}>
      Click
    </Button>
  );
};

storiesOf('Confirmation dialog', module)
  .addDecorator(getStory => (
    <ConfirmProvider>{getStory()}</ConfirmProvider>
  ))
  .add('basic', () => <Basic />)
  .add('with description', () => <WithDescription />)
  .add('with custom text', () => <WithCustomText />)
  .add('with custom dialog props', () => <WithDialogProps />)
  .add('with custom button props', () => <WithCustomButtonProps />)
  .add('with custom callbacks', () => <WithCustomCallbacks />)
  .add('with custom elements', () => <WithCustomElements />)
  .add('with custom dialog content', () => <WithCustomContent />)
  .add('with loading', () => <WithLoading />);
