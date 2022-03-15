public with sharing class accountLoader {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String searchString, Integer lim, Integer offset)
    {
        String str;
        if (searchString!=null)
        {
            str='%'+searchString+'%';
        }
        else {
            str='%';
        }
        System.debug(offset);

        return [SELECT Id, Name FROM Account WHERE Name LIKE :str LIMIT :lim OFFSET :offset];
    }
    @AuraEnabled
    public static Integer getTotalPages(String searchString){
        String str;
        if (searchString!=null)
        {
            str='%'+searchString+'%';
        }
        else {
            str='%';
        }
        List<Account> allAccs = [SELECT Name FROM Account WHERE Name LIKE :str];
        return allAccs.size();
    }
}
