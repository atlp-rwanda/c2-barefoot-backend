import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1110980',
  key: '1c9e936cc23c18f29b05',
  secret: '29d03e975051b5e8dcd3',
  cluster: 'ap2',
  useTLS: true
});

export default pusher;
