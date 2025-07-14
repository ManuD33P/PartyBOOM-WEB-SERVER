import {
    Player,
    IPlayer,
    PlayerProps,
    PlayerIterator
  } from "../src/App/Controllers/index.ts";
  
  const players: IPlayer[] = [];
  
  // 1) Creamos 5 players con vida aleatoria (0–3)
  for (let i = 0; i < 5; i++) {
    const props: PlayerProps = {
      name: `player${i}`,
      id: i,
      idRoom: 10,
      life: Math.floor(Math.random() * 4)
    };
    players.push(new Player(props));
  }
  
  // 2) Instanciamos el iterador
  const iterator = new PlayerIterator(players);
  
  // 3) Recorremos turns mientras haya al menos dos jugadores vivos
  let current: IPlayer | null = iterator.next();
  let lastAlive: IPlayer | null = null;
  
  while (current !== null) {
    // A cada paso guardamos el posible ganador
    lastAlive = current;
  
    // Simulamos acierto (true) o fallo (false)
    const answeredCorrectly = Math.random() < 0.5;
  
    if (!answeredCorrectly) {
      current.subtractLife();
      console.log("💥 BOOM!");
      console.log(
        `${current.getName()} perdió una vida. Vida restante: ${current.getLife()}`
      );
  
      // Mensaje de eliminación si llega a 0
      if (current.getLife() <= 0) {
        console.log(`⚰️  ${current.getName()} ha sido eliminado.`);
      }
    } else {
      console.log(`${current.getName()} contestó bien. Pasa el turno.`);
    }
  
    // Obtenemos el siguiente jugador vivo
    current = iterator.next();
  }
  
  // 4) Al salir del bucle, `lastAlive` es el ganador (o `null` si nadie quedó vivo)
  const winner = iterator.getWinPlayer()
  if (winner) {

    console.log(`🏆 Winner: ${winner.getName()}`);
  } else {
    console.log("No hay ganador: todos han sido eliminados.");
  }