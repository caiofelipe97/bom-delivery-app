export default function formatMoney(money: number): string {
  if (money === 0) {
    return 'Grátis';
  }
  if (!money) {
    return 'R$ 0,00';
  }
  let formated = money
    .toFixed(2) // casas decimais
    .replace('.', ',');
  formated = `R$${formated}`;
  return formated;
}
