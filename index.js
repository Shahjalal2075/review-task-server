const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('UserName: ', process.env.DB_USER);
console.log('Password: ', process.env.DB_PASS);


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s6b6iw5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const database = client.db("reviewTaskDB");
        const users = database.collection("users");
        const wallet = database.collection("wallet");
        const withdraw = database.collection("withdraw");
        const deposit = database.collection("deposit");
        const tasks = database.collection("tasks");
        const userTasks = database.collection("userTasks");
        const combineTasks = database.collection("combineTasks");
        const rewardTasks = database.collection("rewardTasks");
        const supportLink = database.collection("supportLink");
        const officeTime = database.collection("officeTime");
        const vipLevel = database.collection("vipLevel");
        const term = database.collection("term");
        const about = database.collection("about");
        const faq = database.collection("faq");
        const announcement = database.collection("announcement");
        const taskRatio = database.collection("taskRatio");
        const signupBonus = database.collection("signupBonus");
        const kycVerify = database.collection("kycVerify");
        const slideImage = database.collection("slideImage");
        const depositAgents = database.collection("depositAgents");
        const promo = database.collection("promo");

        app.get('/user-list', async (req, res) => {
            const cursor = users.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/user-list', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await users.insertOne(user);
            res.send(result);
        })
        app.get('/user-list/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const product = await users.findOne(query);
            res.send(product);
        })
        app.get('/user-info/:username', async (req, res) => {
            const username = req.params.username;
            const query = { username: username };
            const product = await users.findOne(query);
            res.send(product);
        })
        app.delete('/user-list/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await users.deleteOne(query);
            res.send(result);
        })
        app.patch('/user-list/ip-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    loginInfo: updateUser.loginInfo
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/deposit/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    playMatch: updateUser.playMatch,
                    completedQuiz: updateUser.completedQuiz,
                    points: updateUser.points,
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/bal-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    totalBal: updateUser.totalBal,
                    totalDeposit: updateUser.totalDeposit,
                    totalWithdraw: updateUser.totalWithdraw
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/training-bal-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    trainingBal: updateUser.trainingBal,
                    totalBal: updateUser.totalBal,
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/task-bal-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(updateUser);
            const updateDoc = {
                $set: {
                    totalBal: updateUser.totalBal,
                    taskCount: updateUser.taskCount,
                    newBal: updateUser.newBal
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/users-bonus/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            const updateDoc = {
                $set: {
                    totalClaim: updateUser.totalClaim,
                    lastClaim: updateUser.lastClaim,
                    totalBal: updateUser.totalBal
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/task-new-bal-update/:username', async (req, res) => {
            const username = req.params.username;
            const query = { username: username };
            const updateUser = req.body;
            console.log(updateUser);
            const updateDoc = {
                $set: {
                    totalBal: updateUser.totalBal,
                    trainingBal: updateUser.trainingBal,
                    redemPoint: updateUser.redemPoint,
                    taskCount: updateUser.taskCount,
                    newBal: updateUser.newBal
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/promotion-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            const updateDoc = {
                $set: {
                    isPromotion: updateUser.isPromotion,
                    promotionMsg: updateUser.promotionMsg
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/combine-time-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            const updateDoc = {
                $set: {
                    isCombinationActive: updateUser.isCombinationActive,
                    combinationEndTine: updateUser.combinationEndTine,
                    frozenBal: updateUser.frozenBal
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/combine-time-extend/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            const updateDoc = {
                $set: {
                    combinationEndTine: updateUser.combinationEndTine
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/frozen-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    frozenStatus: updateUser.frozenStatus
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/reffer-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    invitationStatus: updateUser.invitationStatus
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/withdraw-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    withdrawStatus: updateUser.withdrawStatus
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/vip-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    vipLevel: updateUser.vipLevel,
                    trainingBal: updateUser.trainingBal,
                    totalBal: updateUser.totalBal
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/superviser-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    superviser: updateUser.superviser
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/task-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    taskCount: updateUser.taskCount,
                    resetCount: updateUser.resetCount
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/daily-reset', async (req, res) => {
            const updateUser = req.body;
            console.log('Daily Reset with:', updateUser);

            const updateDoc = {
                $set: {
                    resetCount: updateUser.resetCount,
                    newBal: updateUser.newBal
                }
            };

            const result = await users.updateMany({}, updateDoc);
            res.send(result);
        });

        app.patch('/user-list/withdraw-pass-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    withdrawPass: updateUser.withdrawPass
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/login-pass-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    password: updateUser.password
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/reputation-update/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    reputation: updateUser.reputation
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/wallet', async (req, res) => {
            const cursor = wallet.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/wallet', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await wallet.insertOne(user);
            res.send(result);
        })
        app.get('/wallet/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const product = await wallet.findOne(query);
            res.send(product);
        })
        app.get('/withdraw-wallet/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const product = await wallet.find(query).toArray();
            res.send(product);
        })
        app.patch('/wallet/:email', async (req, res) => {
            const email = req.params.email;
            const query = { username: email };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    walletAddress: updateUser.walletAddress,
                    realName: updateUser.realName,
                }
            }
            const result = await wallet.updateOne(query, updateDoc);
            res.send(result);
        })
        app.delete('/wallet/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await wallet.deleteOne(query);
            res.send(result);
        })

        app.get('/withdraw', async (req, res) => {
            const cursor = withdraw.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/withdraw', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await withdraw.insertOne(user);
            res.send(result);
        })
        app.get('/withdraw/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const product = await withdraw.find(query).toArray();
            res.send(product);
        })
        app.get('/withdraw-list/:email', async (req, res) => {
            const email = req.params.email;
            const query = { username: email };
            const product = await withdraw.find(query).toArray();
            res.send(product);
        })
        app.patch('/withdraw/:email', async (req, res) => {
            const email = req.params.email;
            const query = { _id: new ObjectId(email) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    status: updateUser.status,
                    operator: updateUser.operator,
                    auditTime: updateUser.auditTime
                }
            }
            const result = await withdraw.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/deposit', async (req, res) => {
            const cursor = deposit.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/deposit', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await deposit.insertOne(user);
            res.send(result);
        })
        app.get('/deposit/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const product = await deposit.find(query).toArray();
            res.send(product);
        })
        app.get('/deposit-list/:email', async (req, res) => {
            const email = req.params.email;
            const query = { username: email };
            const product = await deposit.find(query).toArray();
            res.send(product);
        })
        app.patch('/deposit/:email', async (req, res) => {
            const email = req.params.email;
            const query = { _id: new ObjectId(email) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    status: updateUser.status,
                }
            }
            const result = await deposit.updateOne(query, updateDoc);
            res.send(result);
        })


        app.get('/tasks', async (req, res) => {
            const cursor = tasks.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/tasks', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await tasks.insertOne(user);
            res.send(result);
        })
        app.get('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await tasks.findOne(query);
            res.send(product);
        })
        app.patch('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    title: updateUser.title,
                    amount: updateUser.amount,
                    cover: updateUser.cover,
                }
            }
            const result = await tasks.updateOne(query, updateDoc);
            res.send(result);
        })
        app.delete('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await tasks.deleteOne(query);
            res.send(result);
        })

        app.get('/user-tasks', async (req, res) => {
            const cursor = userTasks.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/user-tasks', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await userTasks.insertOne(user);
            res.send(result);
        })
        app.get('/user-tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await userTasks.findOne(query);
            res.send(product);
        })

        app.patch('/user-tasks/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    status: updateUser.status,
                    runingTask: updateUser.runingTask,
                    taskEnd: updateUser.taskEnd,
                    profit: updateUser.profit
                }
            }
            const result = await userTasks.updateOne(query, updateDoc);
            res.send(result);
        })

        app.patch('/user-tasks/update/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    status: updateUser.status,
                    taskEnd: updateUser.taskEnd,
                    profit: updateUser.profit
                }
            }
            const result = await userTasks.updateOne(query, updateDoc);
            res.send(result);
        })

        app.patch('/user-tasks/update/runing/:id/:username', async (req, res) => {
            const id = req.params.id;
            const username = req.params.username;
            const query = { oldId: id, status: "Pending", username: username };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    status: updateUser.status,
                    taskEnd: updateUser.taskEnd,
                    profit: updateUser.profit
                }
            }
            const result = await userTasks.updateOne(query, updateDoc);
            res.send(result);
        })
        app.get('/user-tasks/all/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const result = await userTasks.find(query).toArray();
            res.send(result);
        })

        app.get('/combine-task', async (req, res) => {
            const cursor = combineTasks.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/combine-task', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await combineTasks.insertOne(user);
            res.send(result);
        })
        app.get('/combine-task/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const product = await combineTasks.find(query).toArray();
            res.send(product);
        })
        app.delete('/combine-task/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await combineTasks.deleteOne(query);
            res.send(result);
        })

        app.get('/reward-task', async (req, res) => {
            const cursor = rewardTasks.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/reward-task', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await rewardTasks.insertOne(user);
            res.send(result);
        })
        app.get('/reward-task/:email', async (req, res) => {
            const email = req.params.email;
            const isEmail = email.includes('@');
            const query = isEmail ? { email: email } : { phone: email };
            const product = await rewardTasks.find(query).toArray();
            res.send(product);
        })
        app.delete('/reward-task/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await rewardTasks.deleteOne(query);
            res.send(result);
        })

        app.get('/support-link', async (req, res) => {
            const cursor = supportLink.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/support-link', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await supportLink.insertOne(user);
            res.send(result);
        })
        app.get('/support-link/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const product = await supportLink.findOne(query);
            res.send(product);
        })
        app.patch('/support-link/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    telegram1: updateUser.telegram1,
                    telegram2: updateUser.telegram2,
                    whatsapp: updateUser.whatsapp
                }
            }
            const result = await supportLink.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/office-time', async (req, res) => {
            const cursor = officeTime.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/office-time', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await officeTime.insertOne(user);
            res.send(result);
        })
        app.get('/office-time/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const product = await officeTime.findOne(query);
            res.send(product);
        })
        app.patch('/office-time/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    end: updateUser.end,
                }
            }
            const result = await officeTime.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/term', async (req, res) => {
            const cursor = term.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/term', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await term.insertOne(user);
            res.send(result);
        })
        app.get('/term/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const product = await term.findOne(query);
            res.send(product);
        })
        app.patch('/term/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    text: updateUser.text,
                }
            }
            const result = await term.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/about', async (req, res) => {
            const cursor = about.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/about', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await about.insertOne(user);
            res.send(result);
        })
        app.get('/about/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const product = await about.findOne(query);
            res.send(product);
        })
        app.patch('/about/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    text: updateUser.text,
                }
            }
            const result = await about.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/faq', async (req, res) => {
            const cursor = faq.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/faq', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await faq.insertOne(user);
            res.send(result);
        })
        app.get('/faq/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { _id: new ObjectId(secret) };
            const product = await faq.findOne(query);
            res.send(product);
        })
        app.patch('/faq/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { _id: new ObjectId(secret) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    question: updateUser.question,
                    answer: updateUser.answer,
                }
            }
            const result = await faq.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/announcement', async (req, res) => {
            const cursor = announcement.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/announcement', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await announcement.insertOne(user);
            res.send(result);
        })
        app.get('/announcement/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { _id: new ObjectId(secret) };
            const product = await announcement.findOne(query);
            res.send(product);
        })
        app.patch('/announcement/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { _id: new ObjectId(secret) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    title: updateUser.title,
                    details: updateUser.details,
                }
            }
            const result = await announcement.updateOne(query, updateDoc);
            res.send(result);
        })

        app.delete('/announcement/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await announcement.deleteOne(query);
            res.send(result);
        })

        app.get('/vip-level', async (req, res) => {
            const cursor = vipLevel.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/vip-level', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await vipLevel.insertOne(user);
            res.send(result);
        })
        app.get('/vip-level/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await vipLevel.findOne(query);
            res.send(product);
        })

        app.patch('/vip-level/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    vip: updateUser.vip,
                    price: updateUser.price,
                    taskLimit: updateUser.taskLimit,
                    profit: updateUser.profit,
                    minWithdraw: updateUser.minWithdraw,
                    maxWithdraw: updateUser.maxWithdraw
                }
            }
            const result = await vipLevel.updateOne(query, updateDoc);
            res.send(result);
        })
        app.delete('/vip-level/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await vipLevel.deleteOne(query);
            res.send(result);
        })

        app.get('/task-ratio', async (req, res) => {
            const cursor = taskRatio.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/task-ratio', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await taskRatio.insertOne(user);
            res.send(result);
        })
        app.get('/task-ratio/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const product = await taskRatio.findOne(query);
            res.send(product);
        })
        app.patch('/task-ratio/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    max: updateUser.max,
                    min: updateUser.min,
                }
            }
            const result = await taskRatio.updateOne(query, updateDoc);
            res.send(result);
        })

        app.get('/signup-bonus', async (req, res) => {
            const query = { secret: 'officetimealien' };
            const result = await signupBonus.findOne(query);
            res.send(result.bonus);
        })
        app.post('/signup-bonus', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await signupBonus.insertOne(user);
            res.send(result);
        })
        app.patch('/signup-bonus/:name', async (req, res) => {
            const secret = req.params.name;
            const query = { secret: secret };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    bonus: updateUser.bonus
                }
            }
            const result = await signupBonus.updateOne(query, updateDoc);
            res.send(result);
        })
        app.get('/kyc-verify', async (req, res) => {
            const cursor = kycVerify.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/kyc-verify', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await kycVerify.insertOne(user);
            res.send(result);
        })
        app.patch('/kyc-verify/:name', async (req, res) => {
            const name = req.params.name;
            const query = { username: name };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    status: updateUser.status
                }
            }
            const result = await kycVerify.updateOne(query, updateDoc);
            res.send(result);
        })
        app.patch('/user-list/kyc/:name', async (req, res) => {
            const name = req.params.name;
            const query = { username: name };
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    isVerify: updateUser.isVerify
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.get('/slideshow', async (req, res) => {
            const cursor = slideImage.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/slideshow', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await slideImage.insertOne(user);
            res.send(result);
        })
        app.delete('/slideshow/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await slideImage.deleteOne(query);
            res.send(result);
        })
        app.get('/deposit-agent', async (req, res) => {
            const cursor = depositAgents.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/deposit-agent', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await depositAgents.insertOne(user);
            res.send(result);
        })
        app.delete('/deposit-agent/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await depositAgents.deleteOne(query);
            res.send(result);
        })
        app.get('/promo-code', async (req, res) => {
            const cursor = promo.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/promo-code', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await promo.insertOne(user);
            res.send(result);
        })
        app.delete('/promo-code/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id: ', id);
            const query = { _id: new ObjectId(id) };
            const result = await promo.deleteOne(query);
            res.send(result);
        })

        /* app.get('/user-list', async (req, res) => {
            const cursor = users.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post('/user-list', async (req, res) => {
            const user = req.body;
            console.log('User Add', user);
            const result = await users.insertOne(user);
            res.send(result);
        })
        app.get('/user-list/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const product = await users.findOne(query);
            res.send(product);
        })
        app.patch('/user-list/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const updateUser = req.body;
            console.log(query);
            const updateDoc = {
                $set: {
                    playMatch: updateUser.playMatch,
                    completedQuiz: updateUser.completedQuiz,
                    points: updateUser.points,
                }
            }
            const result = await users.updateOne(query, updateDoc);
            res.send(result);
        })
        app.delete('/followers/:from/:to', async (req, res) => {
            const from = req.params.from;
            const to = req.params.to;
            const query = { from: from, to: to };
            const result = await followers.deleteOne(query);
            res.send(result);
        })
        app.delete('/projects/:id', async (req, res) => {
            const id = req.params.id;
            console.log('delete server id:', id);
            const query = { _id: new ObjectId(id) };
            const result = await projectsList.deleteOne(query);
            res.send(result);
        }) */

    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Task Server Running.");
})

app.listen(port, () => {
    console.log(`Ser running port: ${port}`);
}) 