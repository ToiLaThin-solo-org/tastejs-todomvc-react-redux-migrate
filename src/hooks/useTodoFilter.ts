import { useSearchParams } from 'react-router-dom';
import { getTodoFilter } from '@/selectors/selectorTodo';

export function useTodoFilter() {
    const [searchParams] = useSearchParams();
    //can add effect to sync with local storage on close / change tab event (depends on filter is a big wins here instead of location)
    const filter = getTodoFilter(searchParams);
    return filter;
}
