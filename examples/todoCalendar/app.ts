import { State, Template } from '@/core/oem';
import { useAttributeTrait } from '@/traits/Attribute';
import { useClassNameTrait } from '@/traits/ClassName';
import { useEventTrait } from '@/traits/Event';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useStyleTrait } from '@/traits/Style';

// Configure template with needed traits
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  attr: useAttributeTrait,
  class: useClassNameTrait,
  html: useInnerHTMLTrait,
});

// Types
type Todo = {
  id: string;
  text: string;
  completed: boolean;
  date: string; // ISO date string (YYYY-MM-DD)
  createdAt: number;
};

type ViewMode = 'calendar' | 'list';

// State
const todos = State<Todo[]>([]);
const viewMode = State<ViewMode>('calendar');
const selectedDate = State<Date>(new Date());
const newTodoText = State('');
const dialogVisible = State(false);
const dialogDate = State<Date | null>(null);

// Utility functions
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getMonthName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  // Add empty slots for days before month starts
  const firstDayOfWeek = firstDay.getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDate = new Date(year, month, -firstDayOfWeek + i + 1);
    days.push(emptyDate);
  }

  // Add all days in month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

const getTodosForDate = (date: string): Todo[] => {
  return todos.val().filter((todo) => todo.date === date);
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return formatDate(date) === formatDate(today);
};

const isSameMonth = (date: Date, referenceDate: Date): boolean => {
  return (
    date.getMonth() === referenceDate.getMonth() &&
    date.getFullYear() === referenceDate.getFullYear()
  );
};

// Actions
const addTodo = () => {
  const text = newTodoText.val().trim();
  if (!text) return;

  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    date: formatDate(selectedDate.val()),
    createdAt: Date.now(),
  };

  todos.reduce((list) => [...list, newTodo]);
  newTodoText.set('');

  // Clear the input field in the DOM
  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
  if (input) input.value = '';
};

const toggleTodo = (id: string) => {
  todos.reduce((list) =>
    list.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
  );
};

const deleteTodo = (id: string) => {
  todos.reduce((list) => list.filter((todo) => todo.id !== id));
};

const changeMonth = (offset: number) => {
  selectedDate.reduce((date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + offset);
    return newDate;
  });
};

const selectDate = (date: Date) => {
  selectedDate.set(date);
};

const showDialog = (date: Date) => {
  dialogDate.set(date);
  dialogVisible.set(true);
};

const closeDialog = () => {
  dialogVisible.set(false);
  dialogDate.set(null);
};

// Components
function Header() {
  return tag.header(
    trait.style('background', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'),
    trait.style('color', 'white'),
    trait.style('padding', '24px 32px'),
    trait.style('boxShadow', '0 2px 8px rgba(0,0,0,0.1)'),

    tag.div(
      trait.style('maxWidth', '1200px'),
      trait.style('margin', '0 auto'),
      trait.style('display', 'flex'),
      trait.style('justifyContent', 'space-between'),
      trait.style('alignItems', 'center'),

      tag.h1(trait.style('fontSize', '28px'), trait.style('fontWeight', '600'), 'Todo Calendar'),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('gap', '12px'),

        tag.button(
          trait.style('padding', '8px 16px'),
          trait.style('border', '2px solid white'),
          trait.style('borderRadius', '6px'),
          trait.style('background', 'transparent', viewMode.$test('calendar')),
          trait.style('background', 'white', viewMode.$test('list')),
          trait.style('color', 'white', viewMode.$test('calendar')),
          trait.style('color', '#667eea', viewMode.$test('list')),
          trait.style('cursor', 'pointer'),
          trait.style('fontWeight', '500'),
          trait.style('transition', 'all 0.2s'),
          trait.event('click', viewMode.$set('calendar')),
          'Calendar',
        ),

        tag.button(
          trait.style('padding', '8px 16px'),
          trait.style('border', '2px solid white'),
          trait.style('borderRadius', '6px'),
          trait.style('background', 'transparent', viewMode.$test('list')),
          trait.style('background', 'white', viewMode.$test('calendar')),
          trait.style('color', 'white', viewMode.$test('list')),
          trait.style('color', '#667eea', viewMode.$test('calendar')),
          trait.style('cursor', 'pointer'),
          trait.style('fontWeight', '500'),
          trait.style('transition', 'all 0.2s'),
          trait.event('click', viewMode.$set('list')),
          'List',
        ),
      ),
    ),
  );
}

function TodoInput() {
  return tag.div(
    trait.style('background', 'white'),
    trait.style('padding', '24px'),
    trait.style('borderRadius', '12px'),
    trait.style('boxShadow', '0 1px 3px rgba(0,0,0,0.1)'),
    trait.style('marginBottom', '24px'),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', '12px'),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', '12px'),
        trait.style('flexWrap', 'wrap'),

        tag.span(
          trait.style('fontWeight', '600'),
          trait.style('color', '#667eea'),
          'Selected Date:',
        ),
        (() => {
          const dateInput = tag.input(
            trait.attr('type', 'date'),
            trait.style('padding', '8px 12px'),
            trait.style('border', '2px solid #e0e0e0'),
            trait.style('borderRadius', '6px'),
            trait.style('fontSize', '14px'),
            trait.style('cursor', 'pointer'),
            trait.event('change', (e?: any) => {
              if (e?.target) {
                const dateValue = (e.target as HTMLInputElement).value;
                if (dateValue) {
                  selectedDate.set(new Date(dateValue + 'T00:00:00'));
                }
              }
            }),
          ) as HTMLInputElement;

          // Set initial value
          dateInput.value = formatDate(selectedDate.val());

          // Update value when selectedDate changes
          selectedDate.sub(() => {
            dateInput.value = formatDate(selectedDate.val());
          });

          return dateInput;
        })(),
        tag.span(
          trait.style('color', '#666'),
          trait.html(
            () =>
              selectedDate.val().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            selectedDate,
          ),
        ),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('gap', '12px'),

        tag.input(
          trait.attr('type', 'text'),
          trait.attr('placeholder', 'Add a new todo...'),
          trait.style('flex', '1'),
          trait.style('padding', '12px 16px'),
          trait.style('border', '2px solid #e0e0e0'),
          trait.style('borderRadius', '8px'),
          trait.style('fontSize', '14px'),
          trait.style('transition', 'border-color 0.2s'),
          trait.event('input', (e?: any) => newTodoText.set((e?.target as HTMLInputElement).value)),
          trait.event('keydown', (e?: any) => {
            if (e?.key === 'Enter') addTodo();
          }),
          trait.event('focus', (e?: any) => {
            if (e?.target) (e.target as HTMLInputElement).style.borderColor = '#667eea';
          }),
          trait.event('blur', (e?: any) => {
            if (e?.target) (e.target as HTMLInputElement).style.borderColor = '#e0e0e0';
          }),
        ),

        tag.button(
          trait.style('padding', '12px 24px'),
          trait.style('background', '#667eea'),
          trait.style('color', 'white'),
          trait.style('border', 'none'),
          trait.style('borderRadius', '8px'),
          trait.style('cursor', 'pointer'),
          trait.style('fontWeight', '600'),
          trait.style('transition', 'background 0.2s'),
          trait.event('click', addTodo),
          trait.event('mouseover', (e?: any) => {
            if (e?.target) (e.target as HTMLElement).style.background = '#5568d3';
          }),
          trait.event('mouseout', (e?: any) => {
            if (e?.target) (e.target as HTMLElement).style.background = '#667eea';
          }),
          'Add',
        ),
      ),
    ),
  );
}

function CalendarDay(date: Date) {
  const dateStr = formatDate(date);
  const dayTodos = getTodosForDate(dateStr);
  const isCurrentMonth = isSameMonth(date, selectedDate.val());
  const isTodayDate = isToday(date);

  return tag.div(
    trait.style('minHeight', '100px'),
    trait.style('padding', '8px'),
    trait.style('border', '1px solid #e0e0e0'),
    trait.style('borderRadius', '8px'),
    trait.style('cursor', 'pointer'),
    trait.style('background', 'white'),
    trait.style('transition', 'all 0.2s'),
    trait.style('opacity', isCurrentMonth ? '1' : '0.4'),
    trait.event('click', () => {
      if (dayTodos.length > 0) {
        showDialog(date);
      } else {
        selectDate(date);
      }
    }),
    trait.event('mouseover', (e?: any) => {
      if (e?.target) {
        (e.target as HTMLElement).style.transform = 'scale(1.02)';
        (e.target as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }
    }),
    trait.event('mouseout', (e?: any) => {
      if (e?.target) {
        (e.target as HTMLElement).style.transform = 'scale(1)';
        (e.target as HTMLElement).style.boxShadow = 'none';
      }
    }),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', '8px'),

      tag.div(
        trait.style('fontWeight', '600'),
        trait.style('color', isTodayDate ? '#667eea' : '#333'),
        trait.style('fontSize', isTodayDate ? '18px' : '14px'),
        date.getDate().toString(),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('gap', '4px'),

        trait.html(() => {
          const items = dayTodos
            .slice(0, 3)
            .map((todo) =>
              tag.div(
                trait.style('fontSize', '12px'),
                trait.style('padding', '4px 6px'),
                trait.style('background', todo.completed ? '#e8f5e9' : '#fff3e0'),
                trait.style('borderLeft', `3px solid ${todo.completed ? '#4caf50' : '#ff9800'}`),
                trait.style('borderRadius', '4px'),
                trait.style('textDecoration', todo.completed ? 'line-through' : 'none'),
                trait.style('color', '#666'),
                trait.style('overflow', 'hidden'),
                trait.style('textOverflow', 'ellipsis'),
                trait.style('whiteSpace', 'nowrap'),
                todo.text,
              ),
            );

          if (dayTodos.length > 3) {
            items.push(
              tag.div(
                trait.style('fontSize', '11px'),
                trait.style('color', '#999'),
                trait.style('padding', '4px 6px'),
                `+${dayTodos.length - 3} more`,
              ),
            );
          }

          return items;
        }, todos),
      ),
    ),
  );
}

function CalendarView() {
  return tag.div(
    trait.style('display', 'block', viewMode.$test('calendar')),
    trait.style('display', 'none', viewMode.$test('list')),

    tag.div(
      trait.style('background', 'white'),
      trait.style('padding', '24px'),
      trait.style('borderRadius', '12px'),
      trait.style('boxShadow', '0 1px 3px rgba(0,0,0,0.1)'),

      // Month navigation
      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '24px'),

        tag.button(
          trait.style('padding', '8px 16px'),
          trait.style('background', '#667eea'),
          trait.style('color', 'white'),
          trait.style('border', 'none'),
          trait.style('borderRadius', '8px'),
          trait.style('cursor', 'pointer'),
          trait.style('fontWeight', '600'),
          trait.event('click', () => changeMonth(-1)),
          '← Previous',
        ),

        tag.h2(
          trait.style('fontSize', '24px'),
          trait.style('fontWeight', '600'),
          trait.style('color', '#333'),
          trait.html(() => getMonthName(selectedDate.val()), selectedDate),
        ),

        tag.button(
          trait.style('padding', '8px 16px'),
          trait.style('background', '#667eea'),
          trait.style('color', 'white'),
          trait.style('border', 'none'),
          trait.style('borderRadius', '8px'),
          trait.style('cursor', 'pointer'),
          trait.style('fontWeight', '600'),
          trait.event('click', () => changeMonth(1)),
          'Next →',
        ),
      ),

      // Day headers
      tag.div(
        trait.style('display', 'grid'),
        trait.style('gridTemplateColumns', 'repeat(7, 1fr)'),
        trait.style('gap', '8px'),
        trait.style('marginBottom', '8px'),

        trait.html(() =>
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) =>
            tag.div(
              trait.style('textAlign', 'center'),
              trait.style('fontWeight', '600'),
              trait.style('color', '#666'),
              trait.style('fontSize', '14px'),
              trait.style('padding', '8px'),
              day,
            ),
          ),
        ),
      ),

      // Calendar grid
      tag.div(
        trait.style('display', 'grid'),
        trait.style('gridTemplateColumns', 'repeat(7, 1fr)'),
        trait.style('gap', '8px'),

        trait.html(
          () => getDaysInMonth(selectedDate.val()).map((date) => CalendarDay(date)),
          selectedDate,
          todos,
        ),
      ),
    ),
  );
}

function TodoItem(todo: Todo) {
  return tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', '12px'),
    trait.style('padding', '16px'),
    trait.style('background', 'white'),
    trait.style('borderRadius', '8px'),
    trait.style('boxShadow', '0 1px 3px rgba(0,0,0,0.1)'),
    trait.style('transition', 'all 0.2s'),

    tag.input(
      trait.attr('type', 'checkbox'),
      trait.style('width', '20px'),
      trait.style('height', '20px'),
      trait.style('cursor', 'pointer'),
      trait.event('change', () => toggleTodo(todo.id)),
      // Set checked attribute if completed
      ...(todo.completed ? [trait.attr('checked', 'true')] : []),
    ),

    tag.div(
      trait.style('flex', '1'),
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', '4px'),

      tag.div(
        trait.style('fontSize', '16px'),
        trait.style('color', '#333'),
        trait.style('textDecoration', todo.completed ? 'line-through' : 'none'),
        todo.text,
      ),

      tag.div(
        trait.style('fontSize', '12px'),
        trait.style('color', '#999'),
        new Date(todo.date).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      ),
    ),

    tag.button(
      trait.style('padding', '8px 12px'),
      trait.style('background', '#ff5252'),
      trait.style('color', 'white'),
      trait.style('border', 'none'),
      trait.style('borderRadius', '6px'),
      trait.style('cursor', 'pointer'),
      trait.style('fontWeight', '500'),
      trait.style('transition', 'background 0.2s'),
      trait.event('click', () => deleteTodo(todo.id)),
      trait.event('mouseover', (e?: any) => {
        if (e?.target) (e.target as HTMLElement).style.background = '#e04848';
      }),
      trait.event('mouseout', (e?: any) => {
        if (e?.target) (e.target as HTMLElement).style.background = '#ff5252';
      }),
      'Delete',
    ),
  );
}

function ListView() {
  return tag.div(
    trait.style('display', 'none', viewMode.$test('calendar')),
    trait.style('display', 'block', viewMode.$test('list')),

    tag.div(
      trait.style('background', 'white'),
      trait.style('padding', '24px'),
      trait.style('borderRadius', '12px'),
      trait.style('boxShadow', '0 1px 3px rgba(0,0,0,0.1)'),

      tag.h2(
        trait.style('fontSize', '24px'),
        trait.style('fontWeight', '600'),
        trait.style('color', '#333'),
        trait.style('marginBottom', '16px'),
        'All Todos',
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('gap', '12px'),

        trait.html(() => {
          const allTodos = todos.val();
          if (allTodos.length === 0) {
            return [
              tag.div(
                trait.style('textAlign', 'center'),
                trait.style('padding', '48px'),
                trait.style('color', '#999'),
                'No todos yet. Add one above!',
              ),
            ];
          }
          return allTodos
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((todo) => TodoItem(todo));
        }, todos),
      ),
    ),
  );
}

function Dialog() {
  return tag.div(
    trait.style('display', 'none', dialogVisible.$test(false)),
    trait.style('display', 'flex', dialogVisible.$test(true)),
    trait.style('position', 'fixed'),
    trait.style('top', '0'),
    trait.style('left', '0'),
    trait.style('right', '0'),
    trait.style('bottom', '0'),
    trait.style('background', 'rgba(0, 0, 0, 0.5)'),
    trait.style('alignItems', 'center'),
    trait.style('justifyContent', 'center'),
    trait.style('zIndex', '1000'),
    trait.event('click', (e?: any) => {
      if (e?.target === e?.currentTarget) closeDialog();
    }),

    tag.div(
      trait.style('background', 'white'),
      trait.style('borderRadius', '12px'),
      trait.style('padding', '24px'),
      trait.style('maxWidth', '600px'),
      trait.style('width', '90%'),
      trait.style('maxHeight', '80vh'),
      trait.style('overflowY', 'auto'),
      trait.style('boxShadow', '0 4px 20px rgba(0,0,0,0.2)'),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('justifyContent', 'space-between'),
        trait.style('alignItems', 'center'),
        trait.style('marginBottom', '20px'),

        tag.h2(
          trait.style('fontSize', '24px'),
          trait.style('fontWeight', '600'),
          trait.style('color', '#333'),
          trait.html(() => {
            const date = dialogDate.val();
            if (!date) return 'Todos';
            return date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          }, dialogDate),
        ),

        tag.button(
          trait.style('padding', '8px 12px'),
          trait.style('background', '#f5f5f5'),
          trait.style('border', 'none'),
          trait.style('borderRadius', '6px'),
          trait.style('cursor', 'pointer'),
          trait.style('fontSize', '18px'),
          trait.style('fontWeight', '600'),
          trait.style('color', '#666'),
          trait.style('transition', 'background 0.2s'),
          trait.event('click', closeDialog),
          trait.event('mouseover', (e?: any) => {
            if (e?.target) (e.target as HTMLElement).style.background = '#e0e0e0';
          }),
          trait.event('mouseout', (e?: any) => {
            if (e?.target) (e.target as HTMLElement).style.background = '#f5f5f5';
          }),
          '×',
        ),
      ),

      tag.div(
        trait.style('display', 'flex'),
        trait.style('flexDirection', 'column'),
        trait.style('gap', '12px'),

        trait.html(
          () => {
            const date = dialogDate.val();
            if (!date) return [];

            const dateStr = formatDate(date);
            const dayTodos = getTodosForDate(dateStr);

            if (dayTodos.length === 0) {
              return [
                tag.div(
                  trait.style('textAlign', 'center'),
                  trait.style('padding', '48px'),
                  trait.style('color', '#999'),
                  'No todos for this date',
                ),
              ];
            }

            return dayTodos.map((todo) => TodoItem(todo));
          },
          dialogDate,
          todos,
        ),
      ),
    ),
  );
}

// Main App
function App() {
  return tag.div(
    trait.style('minHeight', '100vh'),
    trait.style('background', '#f5f5f5'),

    Header(),

    tag.main(
      trait.style('maxWidth', '1200px'),
      trait.style('margin', '0 auto'),
      trait.style('padding', '32px'),

      TodoInput(),
      CalendarView(),
      ListView(),
    ),

    Dialog(),
  );
}

// Mount app
document.body.appendChild(App());
