export const formatHp = (hp) => (hp ? `${hp} HP` : 'N/D');

export const joinList = (values = []) => (values.length ? values.join(', ') : 'N/D');
