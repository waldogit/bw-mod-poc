import query from './query';
import mutation from './mutation';
import passenger from './passenger';

export default {
    ...query,
    ...mutation,
    ...passenger
}