import { useSearchParams } from 'react-router-dom';
import { todoSelectors } from '@/selectors/todoSelectors';

export function useTodoFilter() {
    const [searchParams] = useSearchParams();
    //can add effect to sync with local storage on close / change tab event (depends on filter is a big wins here instead of location)
    const filter = todoSelectors.todoFilter(searchParams);
    return filter;
}
