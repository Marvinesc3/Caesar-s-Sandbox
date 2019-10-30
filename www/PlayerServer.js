//Player Class (should come in handy later for online play)
// Troop class
Bullets = [];
    class Bullet {
        constructor(x, y, Ex, Ey, spd, id) {

            this.x = x;
            this.y = y;
            this.Ey = Ey;
            this.Ex = Ex;
            this.spd = spd;
            this.id = id;
            this.index1 = Bullets.length;


        }

        play() {//TODO make bullet follow enemy
            console.log(this.x, this.y,this.Ex,this.Ey,this.id);
            let that = this;
            console.log("????"+that.id+"  "+(that.Ey - that.y));
            var a = setInterval(function () {

                if ((that.Ex - that.x) < 1 && (that.Ex - that.x) > -1 && (that.Ey - that.y) < 1 && (that.Ey - that.y) > -1) {
                    console.log("HIT! index:" + that.index1);
                    Bullets.splice(that.index1, that.index1 + 1);
                    clearInterval(a);
                }
                else {
                    let temp2 = that.Ey - that.y;
                    let temp3 = that.Ex - that.x;
                   // console.log(temp2,temp3);
                    //console.log("???"+Math.sqrt((that.Ex - that.x)^2+(Math.abs(temp2 - temp))^2));

                    that.y += that.spd * temp2 / (Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5));
                    // console.log(that.spd * (that.Ey - that.y) / (that.Ex - that.x));
                   // console.log("really"+that.id+"  "+(that.Ey - that.y));
                    that.x += that.spd * temp3 / (Math.pow(Math.pow(temp2,2)+Math.pow(temp3,2),.5));
                    //console.log("("+that.x+","+that.y+")");
                }
             }, 60);
            // setInterval(function () {
            //     console.log(that.id + " HELLELELE"+that.x)
            // },500)
        }

    }


    class GameTroopServer {//TODO make the drawing start for the middle not the edges!!!

        constructor(x, y, health, dmg, range, speed, size, name, att_spd, time,id) {
            this.x = x;
            this.y = y;
            this.health = health;
            this.range = range;
            this.dmg = dmg;
            this.size = size;
            this.speed = speed * 100;
            this.name = name;
            this.att_spd = att_spd;
            this.saved_time = time;
            this.killCount = 0;
            this.level = 1;
            this.attack_linex = [];
            this.attack_liney = [];
            this.attack_lineEx = [];
            this.attack_lineEy = [];
            this.temp = false;
            this.id = id;
        }

        getDistanceToTarget(tx, ty) {
            return Math.sqrt(Math.pow(this.x - tx, 2) + Math.pow(this.y - ty, 2));
        }

//     attack (enemy) {
//         enemy.health -= this.dmg + this.dmg*(this.level/2);
//         if (enemy.health <= 0) {
//             this.killCount+=1;
//             if (this.killCount >= this.level*2  ) {
//                 this.killCount = 0;
//                 this.level += 1;
//                 this.size += 5;
//             }
//         }
//         setTimeout(function(){}, 300000);
//     }
//
//     movement_heuristic(enemies, allies) {
//         let terror = 0;
//
//         if (enemies.length < 10 && allies.length < 10) {
//             return false;
//         }
//
//         for (let i=0; i<enemies.length; i++) {
//             if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < 100) {//TODO
//                 if (this.name === "Melee" && enemies[i].name==="Archer") {
//                     terror += 2*enemies[i].level;
//                 } else if (this.name === "Archer" && enemies[i].name==="Tank") {
//                     terror += 1*enemies[i].level;
//                 } else if (this.name === "Melee" && enemies[i].name==="Tank") {
//                     terror += 0.5*enemies[i].level;
//                 }
//             }
//         }
//
//         for (let i=0; i<allies.length; i++) {
//             if (this.getDistanceToTarget(allies[i].x, allies[i].y) < 100) {
//                 if (this.name === "Melee" && allies[i].name==="Archer") {
//                     terror -= 0.5*allies[i].level;
//                 } else if (this.name === "Archer" && allies[i].name==="Tank") {
//                     terror -= 1*allies[i].level;
//                 } else if (this.name === "Melee" && allies[i].name==="Tank") {
//                     terror -= 2*allies[i].level;
//                 }
//             }
//         }
//
//         terror -= this.level;
//
//         if (terror <= 0) {
//             return false;
//         } else {
//             return true;
//         }
//     }
//
//     autoMove(enemies, allies) {
//         let ex = 1000000;
//         let ey = 1000000;
//
//         for (let i=0; i<enemies.length; i++) {
//
//             let terror = this.movement_heuristic(enemies, allies);
//
//             if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < this.range) {
//                 this.attack(enemies[i]);
//                 break;
//             } else if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < this.getDistanceToTarget(ex, ey)) {
//                 ex =  enemies[i].x;
//                 ey = enemies[i].y;
//                 let canMove = 0;
//                 if (!this.checkBounds(ex, ey)) {
//                     canMove = true;
//                 }
//                 if (canMove) {
//                     this.targetMove(ex, ey, terror);
//                 }
//             }
//         }
//     }
//
//     targetMove(tx, ty, terror) {
//         let xspeed = (tx - this.x)/this.speed;
//         let yspeed = (ty - this.y)/this.speed;
//
//         if (terror) {
//             xspeed = (this.x - tx)/this.speed;
//             yspeed = (this.y - ty)/this.speed;
//         }
//
//         if (this.x + xspeed < 0) {
//             this.x = 0;
//         // } else if (this.x + xspeed > window.innerWidth) {
//         //     this.x = window.innerWidth;
//         } else {
//             this.x += xspeed;
//         }
//
//         if (this.y + yspeed < 0) {
//             this.y = 0;
//         // } else if (this.y + yspeed > window.innerHeight) {
//         //     this.y = window.innerHeight;
//         } else {
//             this.y += yspeed;
//         }
//     }
// }

        attack(enemy) {
            let current_time = new Date();
            //console.log("IMPORTANT!!!!!!!!!!!!!!!!!!!!!!!!"+this.saved_time);
            //console.log("saved ="+this.saved_time.getTime() +"curr = "+current_time.getTime()+"\ndiff="+(this.saved_time.getTime()-current_time.getTime()))
            if (current_time.getTime() - this.saved_time > this.att_spd * 1000) {
                console.log("attacked");
                enemy.health -= this.dmg /2 + this.dmg * (this.level / 2 );
                if (enemy.health <= 0) {
                    this.killCount += 1;
                    if (this.killCount >= this.level * 2) {
                        this.killCount = 0;
                        this.level += 1;
                        this.size *= 1.25;
                        this.health += 50;
                    }
                }
                // line(this.x, this.y, enemy.x, enemy.y);// TODO DO THIS ON CLIET
                //console.log("setting line val: "+this.attack_linex);
                // this.attack_linex = (this.x);
                // this.attack_liney = (this.y);
                // this.attack_lineEx = (enemy.x);
                // this.attack_lineEy = (enemy.y);
                //console.log(this.x, this.y, enemy.x, enemy.y);
                var temp = new Bullet(this.x, this.y, enemy.x, enemy.y, .2,this.id );
                Bullets.push(temp);
                console.log("HERE"+Bullets);
                temp.play();
                this.d = new Date();
                this.saved_time = this.d.getTime();
            }
            //setTimeout(function(){}, 3000);

        }

        movement_heuristic(enemies, allies) {

            let terror = 0;

            if (enemies.length < 10 && allies.length < 10) {
                return false;
            }

            for (let i = 0; i < enemies.length; i++) {
                if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < 100) {
                    if (this.name === "Melee" && enemies[i].name === "Archer") {

                        terror += 3;

                    } else if (this.name === "Archer" && enemies[i].name === "Tank") {

                        terror += 2;

                    } else if (this.name === "Melee" && enemies[i].name === "Tank") {

                        terror += 1.5;

                    }

                }

            }


            for (let i = 0; i < allies.length; i++) {

                if (this.getDistanceToTarget(allies[i].x, allies[i].y) < 100) {

                    if (this.name === "Melee" && allies[i].name === "Archer") {

                        terror -= 1.5;

                    } else if (this.name === "Archer" && allies[i].name === "Tank") {

                        terror -= 2;

                    } else if (this.name === "Melee" && allies[i].name === "Tank") {

                        terror -= 3;

                    }

                }

            }


            if (terror <= 5) {

                return false;

            } else {

                return true;

            }

        }


        autoMove(enemies, allies) {

            let ex = 1000000;
            let ey = 1000000;
            let terror = 0;


            for (let i = 0; i < enemies.length; i++) {
                let terror = this.movement_heuristic(enemies, allies);
                if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < this.range) {//TODO attacks all enemies onstead of 1
                    this.attack(enemies[i]);
                    break;
                } else if (this.getDistanceToTarget(enemies[i].x, enemies[i].y) < this.getDistanceToTarget(ex, ey)) {
                    ex = enemies[i].x;
                    ey = enemies[i].y;
                    this.targetMove(ex, ey, terror);
                }

            }

        }


        targetMove(tx, ty, terror) {

            let xspeed = (tx - this.x) / this.speed;
            let yspeed = (ty - this.y) / this.speed;


            if (terror) {
                xspeed = (this.x - tx) / this.speed;
                yspeed = (this.y - ty) / this.speed;

            }


            // if (this.x + xspeed < 0) {

            //     this.x = 0;

            //     // } else if (this.x + xspeed > window.innerWidth) {
            //     //
            //     //     this.x = window.innerWidth;
            //     //
            // } else {

            //     this.x += xspeed;

            // }
            this.x += xspeed;


            // if (this.y + yspeed < 0) {

            //     this.y = 0;

            //     //} else if (this.pos.y + yspeed > window.innerHeight) {
            //     //
            //     //    this.pos.y = window.innerHeight;

            // } else {

            //     this.y += yspeed;

            // }
            this.y += yspeed;

        }
    }

//Melee Class
    class MeleeSoldierServer extends GameTroopServer {

        constructor(x, y, name, time, hp = MELEEHP,id) {
            //x, y, health, dmg, range, speed, size, name, att_spd
            super(x, y, hp, 75, 20, 10, 7, "Melee", 1.5, time,id);
        }

        checkBounds(tx, ty) {
            if (this.getDistanceToTarget(tx, ty) <= this.size / 2) {
                return true;
            }
            return false;
        }

    }
    TANKHP = 600;
    MELEEHP = 300;
    ARCHERHP = 200;

// Archer (ranger) Class

    class ArcherServer extends GameTroopServer {

        constructor(x, y, name, time, hp = ARCHERHP,id) {
            //x, y, health, dmg, range, speed, size, name, att_spd
            super(x, y, hp, 50, 70, 30, 20, "Archer", 1, time,id);
        }

        checkBounds(tx, ty) {
            if (this.getDistanceToTarget(tx, ty) <= this.size / 2) {
                return true;
            }
            return false;
        }

    }

// Tank Class
    class TankServer extends GameTroopServer {

        constructor(x, y, name, time, hp = TANKHP,id) {
            //x, y, health, dmg, range, speed, size, name, acc
            super(x, y, hp, 150, 35, 50, 40, "Tank", 5, time,id);
        }

        checkBounds(tx, ty) {
            if (tx >= this.x || tx <= this.x + this.size) {
                return true;
            }
            if (ty >= this.y || ty <= this.y + this.size) {
                return true;
            }
            return false;
        }

    }
    class PlayerServer {
        constructor(id, color) {
            this.TANKHP = TANKHP;
            this.MELEEHP = MELEEHP;
            this.ARCHERHP = ARCHERHP;
            this.id = id;
            this.numTroops = 0;
            this.army = [];
            this.color = color;
            this.enemies = [];
            this.meleeX1 = [];
            this.meleeY1 = [];
            this.archerX1 = [];
            this.archerY1 = [];
            this.tankX1 = [];
            this.tankY1 = [];
            this.meleeX2 = [];
            this.meleeY2 = [];
            this.archerX2 = [];
            this.archerY2 = [];
            this.tankX2 = [];
            this.tankY2 = [];
            this.meleehpE = [];
            this.archerhpE = [];
            this.tankhpE = [];
            this.attack_linex = [];
            this.attack_liney = [];
            this.attack_lineEx = [];
            this.attack_lineEy = [];
            this.meleeTime = [];
            this.archerTime = [];
            this.tankTime = [];
            this.bullets = [];
        }

        update() {
            vx = this.x - mx;
            vy = this.y - my;
            this.x += vx;
            this.y += vy; //idk if this math is right
        }

        moveArmy() {

            for (let i = 0; i < this.army.length; i++) {
                if (this.army[i].health <= 0) {
                    this.army.splice(i, 1);
                    this.numTroops -= 1;
                }
            }

            for (let i = 0; i < this.army.length; i++) {
                this.army[i].autoMove(this.enemies, this.army);
            }

            for (let i = 0; i < this.army.length; i++) {
                this.army[i].autoMove(this.enemies, this.army);
                this.meleeX1 = [];
                this.meleeY1 = [];
                this.archerX1 = [];
                this.archerY1 = [];
                this.tankX1 = [];
                this.tankY1 = [];
                for (let x = 0; x < this.army.length; x++) {
                    if (this.army[x].name === ("Melee")) {
                        this.meleeX1.push(this.army[x].x);
                        this.meleeY1.push(this.army[x].y);
                        this.meleeTime.push(this.army[x].saved_time);
                    }
                    if (this.army[x].name === ("Tank")) {
                        this.tankX1.push(this.army[x].x);
                        this.tankY1.push(this.army[x].y);
                        this.archerTime.push(this.army[x].saved_time);
                    }
                    if (this.army[x].name === ("Archer")) {
                        this.archerX1.push(this.army[x].x);
                        this.archerY1.push(this.army[x].y);
                        this.tankTime.push(this.army[x].saved_time);
                    }

                }
                this.meleeX2 = [];
                this.meleeY2 = [];
                this.archerX2 = [];
                this.archerY2 = [];
                this.tankX2 = [];
                this.tankY2 = [];
                for (let x = 0; x < this.enemies.length; x++) {
                    if (this.enemies[x].name === ("Melee")) {
                        this.meleeX2.push(this.enemies[x].x);
                        this.meleeY2.push(this.enemies[x].y);
                        this.meleehpE.push(this.enemies[x].health);
                    }
                    if (this.enemies[x].name === ("Tank")) {
                        this.tankX2.push(this.enemies[x].x);
                        this.tankY2.push(this.enemies[x].y);
                        this.tankhpE.push(this.enemies[x].health);
                    }
                    if (this.enemies[x].name === ("Archer")) {
                        this.archerX2.push(this.enemies[x].x);
                        this.archerY2.push(this.enemies[x].y);
                        this.archerhpE.push(this.enemies[x].health);
                    }

                }
            }

            // for (let i = 0; i < this.army.length; i++) {
            //     //if (this.army[i].attack_linex !== undefined)
            //       //  console.log("player line array: " + this.army[i].attack_linex);
            //     this.attack_linex.push(this.army[i].attack_linex);
            //     this.attack_liney.push(this.army[i].attack_liney);
            //     this.attack_lineEx.push(this.army[i].attack_lineEx);
            //     this.attack_lineEy.push(this.army[i].attack_lineEy);//TODO fix this so it lasts for a while and not just a frame
            // }
            for (let i = 0; i < Bullets.length; i++) {
                // console.log("*****");
                // console.log(Bullets.length);
                // console.log(this.attack_linex);
                //console.table(Bullets);

                if(this.id === Bullets[i].id) {
                    this.attack_linex.push(Bullets[i].x);
                    this.attack_liney.push(Bullets[i].y);
                    this.attack_lineEx.push(Bullets[i].Ex);
                    this.attack_lineEy.push(Bullets[i].Ey);
                }
            }
        }

        createArmy(meleeX2, meleeY2, archerX2, archerY2, tankX2, tankY2, meleeTime, archerTime, tankTime, meleehp1, archerhp1, tankhp1,index) {
            let temp = [];
            for (let i = 0; i < meleeX2.length; i++) {
                temp.push(new MeleeSoldierServer(meleeX2[i], meleeY2[i], i, meleeTime[i], meleehp1[i],index));

            }
            for (let i = 0; i < archerX2.length; i++) {
                temp.push(new ArcherServer(archerX2[i], archerY2[i], i, archerTime[i], archerhp1[i],index));
            }
            for (let i = 0; i < tankX2.length; i++) {

                temp.push(new TankServer(tankX2[i], tankY2[i], i, tankTime[i], tankhp1[i],index));
            }
            return temp;
        }

        addArmyOnClick(x1, y1, id) {
            this.numTroops++;
            let armyArray = this.army;
            //armyArray.push(new Archer(space, random(height), this.id, this.color));
            if (id === 0) {
                armyArray.push(new MeleeSoldierServer(x1, y1, this.id, this.color));
            }
            else if (id === 1) {
                armyArray.push(new ArcherServer(x1, y1, this.id, this.color));
            }
            else if (id === 2) {
                armyArray.push(new TankServer(x1, y1, this.id, this.color));
            }
            //armyArray.push(new Archer(x1, y1, this.id, this.color));
            this.army = armyArray;
        }

        init(enemyTroopArr) {
            this.enemies = enemyTroopArr;
        }
    }

module.exports = PlayerServer;

