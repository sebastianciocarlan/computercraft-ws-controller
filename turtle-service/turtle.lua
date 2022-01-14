WS = false

while not WS do
    print("Trying to connect...")
    WS = http.websocket("ws://localhost:3000")
    print(WS)
    if(not WS) then

        print("Not connected. Trying again in a few seconds...")
        os.sleep(30)
    end
end
term.clear()
term.setCursorPos(1,1)
print("Connected")
if(gps.locate() == not nil) then
    local x,y,z = gps.locate()
    local computerID = os.getComputerID()
    local computerName = "nil"
    if os.getComputerLabel() == not nil then
        computerName = os.getComputerLabel()
    end
  
    
    WS.send('{"reason":"connection","type":"turtle", "position":{"x":'..x..',"y":'..y..',"z":'..z..'},"id":'..computerID..',"name":"'..computerName..'"}')    
else
    local computerID = os.getComputerID()
    local computerName = "nil"
    if os.getComputerLabel() == not nil then
        computerName = os.getComputerLabel()
    end
    WS.send('{"type":"turtle", "position":"null","id":'..computerID..',"name":"'..computerName..'"}')
end

while true do
    print("Awaiting for instructions via Websocket")
    local response = WS.receive(30)
    if(response == nil)then
        print("No response reveived. Trying again.")
    else
        if pcall(loadstring(response)) then
            print("Executing: "..response)
            loadstring(response)
        else
            print("Uncorrect piece of code. Try again.")
        end
    end
end

