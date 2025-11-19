// TOKEN AUTH SIMULATION
let userToken = null;
let tokenExpiry = null;
let tokenAccessCount = 0;

function tokenLogin() {
    userToken = 'tok_' + Math.random().toString(36).substr(2, 16);
    tokenExpiry = Date.now() + (2 * 60 * 60 * 1000); // 2 hours
    tokenAccessCount = 0;
    
    document.getElementById('tokenDisplay').innerHTML = 
        `<strong>✅ TOKEN CREATED!</strong><br>
         Token: ${userToken}<br>
         Expires: ${new Date(tokenExpiry).toLocaleTimeString()}<br>
         <em style="color: red;">⚠️ Vulnerable for 2 HOURS!</em>`;
    
    logToken('🔑 LOGGED IN: Token valid for 2 HOURS');
}

function tokenAccess() {
    if (!userToken) {
        logToken('❌ No token! Login first.');
        return;
    }
    
    tokenAccessCount++;
    logToken(`🔓 ACCESS GRANTED #${tokenAccessCount} with token`);
}

function stealToken() {
    if (!userToken) {
        logToken('👹 Hacker: No token to steal!');
        return;
    }
    
    logToken('🚨 🚨 🚨 TOKEN STOLEN BY HACKER!');
    logToken('👹 Hacker: I have your token! Unlimited access for 2 HOURS!');
    
    // Simulate hacker making multiple requests
    let hackerAccessCount = 0;
    const hackerInterval = setInterval(() => {
        hackerAccessCount++;
        logToken(`👹 Hacker: Making request #${hackerAccessCount} with stolen token...`);
        
        if (hackerAccessCount >= 5) {
            clearInterval(hackerInterval);
            logToken('👹 Hacker: I can keep going for 2 HOURS! 😈');
        }
    }, 1000);
}

function logToken(message) {
    const log = document.getElementById('tokenLog');
    log.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
    log.scrollTop = log.scrollHeight;
}

// EPHEMERAL AUTH SIMULATION
let ephemeralSession = null;
let sessionUsed = false;
let ephemeralAccessCount = 0;

function ephemeralLogin() {
    document.getElementById('ephemeralDisplay').innerHTML = 
        `<strong>🎯 CHALLENGE REQUESTED</strong><br>
         Solving cryptographic proof...`;
    logEphemeral('🔐 Ephemeral challenge requested');
}

function ephemeralSolve() {
    ephemeralSession = 'sess_' + Math.random().toString(36).substr(2, 12);
    sessionUsed = false;
    ephemeralAccessCount = 0;
    
    document.getElementById('ephemeralDisplay').innerHTML = 
        `<strong>✅ EPHEMERAL SESSION CREATED!</strong><br>
         Session: ${ephemeralSession}<br>
         <em style="color: green;">✅ VANISHES after ONE use!</em>`;
    
    logEphemeral('✅ Session created - valid for SINGLE USE only');
}

function ephemeralAccess() {
    if (!ephemeralSession) {
        logEphemeral('❌ No session! Solve challenge first.');
        return;
    }
    
    if (sessionUsed) {
        logEphemeral('💨 Session already USED - VANISHED!');
        ephemeralSession = null;
        document.getElementById('ephemeralDisplay').innerHTML = 
            '<strong>💨 SESSION VANISHED</strong><br>Request new session to continue';
        return;
    }
    
    sessionUsed = true;
    ephemeralAccessCount++;
    logEphemeral(`🔓 ACCESS GRANTED #${ephemeralAccessCount}`);
    logEphemeral('💨 Session MARKED AS USED - will vanish!');
    
    // Visual session destruction
    setTimeout(() => {
        ephemeralSession = null;
        document.getElementById('ephemeralDisplay').innerHTML = 
            '<strong>💨 SESSION VANISHED</strong><br>Self-destructed after single use!';
        logEphemeral('💨 Session SELF-DESTRUCTED after use');
    }, 1500);
}

function stealEphemeral() {
    if (!ephemeralSession) {
        logEphemeral('👹 Hacker: No session to steal!');
        return;
    }
    
    if (sessionUsed) {
        logEphemeral('👹 Hacker: Session already USED - NOTHING to steal!');
        return;
    }
    
    logEphemeral('👹 Hacker: Stole your session...');
    setTimeout(() => {
        logEphemeral('👹 Hacker: Making ONE request with stolen session...');
        setTimeout(() => {
            logEphemeral('💨 Hacker: Session VANISHED after my ONE request!');
            logEphemeral('😡 Hacker: I got NOTHING else! Game over.');
            ephemeralSession = null;
            sessionUsed = true;
            document.getElementById('ephemeralDisplay').innerHTML = 
                '<strong>💨 SESSION STOLEN & USED</strong><br>Hacker got ONE action then NOTHING!';
        }, 1000);
    }, 500);
}

function logEphemeral(message) {
    const log = document.getElementById('ephemeralLog');
    log.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
    log.scrollTop = log.scrollHeight;
}