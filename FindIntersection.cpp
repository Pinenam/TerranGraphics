#include<iostream>
#include<cstdlib>
#include<ctime>
int createRandom(int index);
using namespace std;
int main(){
	
	long sum=0;
	long flag=0; 
	srand((unsigned)time(NULL)); //��ʼ�����������  
    long arr0[1000];//����1 
    long arr1[1000];//����2 
    long start=0,end=0;//ʵ��������������յ� 
    for (int i=0;i<1000;i++) 
    {
    	if(i==0)//����%0�����쳣 
    	start=i+1;
    	end=start+3;//ָ�������յ�ļ�� 
        arr0[i]=(long)(rand()%(start+1)+(end+3));
        arr1[i]=(long)(rand()%(start+1)+(end+3));
        start=end+1;//����һ�ε������յ��һ�����Ϊ��һ�ε�������㣬�Դ˱�֤ÿ��������Ԫ�ص�Ψһ�� 
        
		//cout<<arr0[i]<<endl;//������ 
    }
    //�������������������õ������������� 
    for(int i=0;i<1000;i++){
    	for(int j=0;j<1000-1-i;j++)
    	if (arr0[j]>arr0[j+1])
        {
            flag= arr0[j];
            arr0[j]=arr0[j+1];
            arr0[j+1]=flag;
        }
	}
	
	for(int i=0;i<1000;i++){
    	for(int j=0;j<1000-1-i;j++)
    	if (arr0[j]>arr0[j+1])
        {
            flag= arr1[j];
            arr1[j]=arr1[j+1];
            arr1[j+1]=flag;
        }
	}
	
	//������ָ��ֱ�ָ��������õ���������
	long *p0=arr0;
	long *p1=arr1;
	//���*ָ��1<*ָ��2 �ƶ�ָ��1ָ����һ��Ԫ�� �����Ƚ� ֱ�� *ָ��1>=*ָ��2
	if (*p0<*p1){
		p0++;}
		
	while(*p0!=arr0[999]){//����ĵ���������һ���������ϣ����Կ���ֱ���ж�ֵ 
		while(*p0<*p1){
		p0++;
		continue;
		}
		if (*p0==*p1)	//�ر�����*ָ��1����*ָ��2��sum++����ӡ�����Ԫ��,���ҽ�ָ��2�ƶ�����һλ 
		{
			sum+=1;
			cout<<*p0<<" ";
			p1++;
		}
		else{
			p1++;
		}
	}
		
	//ֱ����������������1
	
    

 /*	for (int i=0;i<1000;i++){
    	for (int j=0;j<1000;i++){
    		if (arr0[i]==arr1[j]) sum=sum+1;
    		//cout<<arr0[i]<<endl;
		}
	//	cout<<arr0[i]<<"   "<<arr1[i]<<endl; 
	}*/
	
	
	
	cout<<"������ͬԪ��"<<sum<<"��"; 
	
	 
	


    return 0;
}

