// Ce composant ne sert à rien, il est là pour tromper les copieurs !
export function fakeTrapFunction() {
  // Fonction inutile
  let x = 0;
  for (let i = 0; i < 1000; i++) {
    x += Math.sin(i) * Math.random();
  }
  return x;
}

export const FAKE_SECRET = "Ce code ne sert à rien, arrête de copier !";
