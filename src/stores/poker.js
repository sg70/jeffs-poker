const Poker = {
  data: {
    // session collection
    sessions: null,
    // session id
    code: '',
    // user is host of the session
    isHost: false,
    // our id of the user
    user: '',
    // our user name
    name: ''
  },
  methods: {
    getSessionCollection: function (db) {
      if (Poker.data.sessions == null) {
        Poker.data.sessions = db.collection('sessions')
      }
      return Poker.data.sessions
    },
    validateCode: function (db, inCode) {
      return new Promise((resolve, reject) => {
        var docRef = this.getSessionCollection(db).doc(inCode)
        docRef.get().then(doc => {
          if (doc.exists) {
            Poker.data.code = doc.id
          }
          resolve(doc.exists)
        }).catch(error => {
          reject(error)
        })
      })
    },
    setUsername: function (db) {
      this.getSessionCollection(db).doc(Poker.data.code).collection('users').add({
        name: Poker.data.name,
        estimate: -4,
        rank: 0
      }).then(userRef => {
        Poker.data.user = userRef.id
      }).catch(error => {
        console.error('Error setUsername(): ' + error)
      })
    },
    resetEstimation: function (db) {
      var userCollectionRef = this.getSessionCollection(db).doc(Poker.data.code).collection('users')
      userCollectionRef.get().then(snapshot => {
        snapshot.forEach(user => {
          userCollectionRef.doc(user.id).update({estimate: -4, rank: 0}).then(doc => {
          }).catch(error => {
            console.error('resetEstimation update user: ' + error)
          })
        })
      })
    },
    hasSessionCode: function () {
      return Poker.data.code !== ''
    },
    hasUsername: function () {
      return Poker.data.name !== ''
    },
    hasUserId: function () {
      return Poker.data.user !== ''
    },
    hasUserAndSession: function () {
      return this.hasSessionCode() && this.hasUsername()
    },
    hasUserIdAndSession: function () {
      return this.hasSessionCode() && this.hasUsername() && this.hasUserId()
    }
  }
}

export default Poker
